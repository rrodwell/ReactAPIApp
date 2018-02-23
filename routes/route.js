//Packages
var fs = require('fs');
var request = require("request-promise");
var path = require("path");
var xml2js = require('xml2js');
var XmlStream = require('xml-stream');
var cheerio = require("cheerio");
var fetch = require("isomorphic-fetch");
var base64 = require('base-64');
var qs = require('qs');




//Require keys
var keys = require("../qTestKeys");


module.exports = function (app) {

    app.get("/okta", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/login-to-okta.html"));
    });

    app.get("/jira/all-tests", function(req,res){
        res.sendFile(path.join(__dirname, "/../public/jira/jira.html"));
    });

    app.get("/jira/mobile", function (req, res) {
        var inputFile = process.argv[2];
        res.sendFile(path.join(__dirname, "/../public/jira/"+inputFile));
    });

    app.get("/scrape", function(req, res){

        var inputFile = path.join(__dirname, "./../public/jira/"+ process.argv[2]);

        fs.readFile(inputFile, 'utf8',function(err, data) {

            console.log(process.argv[2], "was scraped successfully!");
            // console.log("data:", data);

            var parser = new xml2js.Parser({ trim: true });
            parser.parseString(data, function (err, result) {

                var testCases = result.rss.channel[0].item;
                // buildTestCases(testCases);
                res.send(JSON.stringify(testCases));

            });
        });

    });

    app.get("/cheerio", function(req,res){

        var scrapeSite = "http://localhost:3000/jira/mobile";
        var allTestCases = [];

       request(scrapeSite, function (error, response, html) {

           var $ = cheerio.load(html);
           var allTestCases = [];

           $(".tableBorder").each(function (i, element) {

                var newTestCase = {};

                newTestCase.title = $(".formtitle a").eq(i).text();

                newTestCase.description = $("#descriptionArea").eq(i).text().trim();

                var steps =[];
                newTestCase.steps = steps;

                // $(".#project-config-steps-table tbody").each(function (k, element) {
                //     console.log(index);
                //     var newStep = {};
                //     newStep.id = $("#project-config-steps-table tbody tr").eq(k).children("td").eq(0).text().trim();
                //     newStep.test = $("#project-config-steps-table tbody tr").eq(k).children("td").eq(1).children("p").text().trim();
                //     newStep.result = $("#project-config-steps-table tbody tr").eq(k).children("td").eq(3).children("p").text().trim();

                //     steps.push(newStep);
                // });

                $(".value").each(function (j, element) {
                    // $(".#project-config-steps-table tbody").each(function (k, element) {
                        // console.log(index);
                        var newStep = {};
                        newStep.id = $("#project-config-steps-table tbody tr").eq(j).children("td").eq(0).text().trim();
                        newStep.test = $("#project-config-steps-table tbody tr").eq(j).children("td").eq(1).children("p").text().trim();
                        newStep.result = $("#project-config-steps-table tbody tr").eq(j).children("td").eq(3).children("p").text().trim();

                        steps.push(newStep);
                    // });
                });

                allTestCases.push(newTestCase);

           });

            //console.log(JSON.stringify(allTestCases));
            console.log("length:", allTestCases.length);

            res.send(JSON.stringify(allTestCases[0]));

       });

    });


    app.get("/add-test-case", function(req, res){
        //Format and Build out test cases
        function buildTestCases(testCasesArr) {

            var fields = ['Test Case ID', 'Test Case Name', 'Description', "Precondition", "Step Number", "Step Description", "Expected Result", "Test Case Type", "Test Case Status", "Test Case Priority", "Test Case Assigned To"];

            var allTestCases = [];

            for (var i = 0; i < testCasesArr.length; i++) {

                var testStepsArr = [];
                var steps = testCasesArr[i].customfields[0].customfield[1].customfieldvalues[0].steps[0];

                for (j in steps) {
                    for (var k = 0; k < steps[j].length; k++) {

                        var nextStep = {
                            "stepNumber": parseInt(steps[j][k].orderId[0]),
                            "description": steps[j][k].step[0],
                            "expected": steps[j][k].result[0],
                        };


                        testStepsArr.push(nextStep);
                    }
                }

                var newTestCase = {
                    "Test Case ID": i,
                    "Test Case Name": testCasesArr[i].summary[0],
                    "Description": testCasesArr[i].description[0].p,
                    "Test Case Type": "",
                    "Test Case Status": "",
                    "Test Case Priority": "",
                    "Test Case Assigned To": ""
                };

                allTestCases.push(newTestCase);
            }

            // console.log(JSON.stringify(allTestCases));
            writePost(fields, allTestCases);

        }

    });


    app.get("/request", function(req,res){

        var url = keys.qTestKeys.uri + "oauth/token";

        var data = qs.stringify({
            "grant_type": "password",
            "username": keys.qTestKeys.username,
            "password": keys.qTestKeys.password,
        });

        var header = new Headers({
            "Authorization": "Basic " + base64.encode(keys.qTestKeys.username + ":"),
            "Content-Type": "application/x-www-form-urlencoded"
        });

        var obj = {
            method: "POST", // or "PUT"
            headers: header,
            body: data
        }

        var token;

        fetch(url, obj).then(res => res.json())
            .catch(error => console.error("Error:", error))
            .then(loginResponse => {
                token = loginResponse.access_token;
                console.log("Success:", loginResponse)
            });

        console.log(token);

    //     var testCaseURL = keys.qTestKeys.uri + "api/v3/projects/" + keys.qTestKeys.projectId +"/test-cases";
    //     var testCase = {
    //         "name": "Test Case 1 API",
    //         "test_steps": [{
    //             "description": "Test Step description",
    //             "expected": "Test Step description"
    //         }],
    //         "parent_id": 3278350,
    //         "description": "Description of test case 1",
    //         "precondition": "Precondition of test case 1"
    //     };

    //     var postHeader = new Headers({
    //         "Authorization": "bearer " + token,
    //         "Content-Type": "application/json"
    //     });

    //     var postObj = {
    //         method: "POST",
    //         header: postHeader,
    //         body: testCase
    //     };

    //     fetch(testCaseURL, postObj).then(res => res.json())
    //         .catch(error => console.error("Error:", error))
    //         .then(response => console.log("Success:", response));




    });


};