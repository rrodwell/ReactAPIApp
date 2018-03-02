//Packages
import fetch from "isomorphic-fetch";
import base64 from 'base-64';
import qs from 'qs';
import Papa from "papaparse";

const helpers = {


    authenticateUser: function(credentials) {
        // console.log("clicked")
        sessionStorage.setItem("uri", credentials.uri);

        const url = credentials.uri + "oauth/token";

        const data = qs.stringify({
            "grant_type": "password",
            "username": credentials.email,
            "password": credentials.password,
        });

        const header = {
            "Authorization": "Basic " + base64.encode(credentials.email + ":"),
            "Content-Type": "application/x-www-form-urlencoded",
            // "Access-Control-Allow-Origin" :

        }

        const obj = {
            method: "POST", // or "PUT"
            headers: header,
            body: data
        }


        let token;

        fetch(url, obj).then(res => res.json())
            .catch(error => console.error("Error:", error))
            .then(loginResponse => {
                if (loginResponse.access_token != null){
                    token = loginResponse.access_token;
                    // console.log("Success:", loginResponse);
                    console.log("Token", token);
                    sessionStorage.setItem("token",token);
                } else {
                    alert("Incorrect Credential!")
                }
            });

        // console.log("URL", url);
        // console.log("Data", data);
        // console.log("Header", header);
        // console.log("New Obj", obj);
    },

    createDefects: function(defectsArr) {
        // console.log("received");
        // console.log("DefectsArr:",defectsArr);
        
        var allDefects =[];

        for(var i =0; i < defectsArr.length; i++){
            // console.log(defectsArr[i]);
            var key = defectsArr[i].Key;
            var summary = defectsArr[i].Summary;
            var description = defectsArr[i].Description;
            var label = defectsArr[i].Labels;
            var status = defectsArr[i].Status;
            var priority = defectsArr[i].Priority;
            var created = defectsArr[i].Created;
            var creator = defectsArr[i].Creator;

            var newLine = "\n";

            var qTitle = key.concat(": ", summary);
            var qDescription = description.concat(newLine,newLine,"Labels: ", label, newLine, "Creator: ", creator, newLine, "Created At: ", created);
            var qStatus = "";
            var qSeverity = "";

            //Set qTest Severity 
            if (priority == "1.Critical"){
                qSeverity = "Fatal";
            } else if (priority == "2.High"){
                qSeverity = "Major";
            } else if (priority == "3.Medium"){
                qSeverity = "Average";
            } else if (priority == "4.Low") {
                qSeverity = "Minor";
            } else {
                qSeverity = "Cosmetic";
            }

            //Set qTest Status 
            if (status == "Open") {
                qStatus = "New";
            } else if (status == "Closed") {
                qStatus = "Closed";
            } else if (status == "Watch") {
                qStatus = "Deferred";
            } else if (status == "Rejected") {
                qStatus = "Reopened";
            }

            var defectProps = [
                {
                    "field_id": 2637217,
                    "field_value": qTitle
                }, 
                {
                    "field_id": 2637220,
                    "field_value": qDescription
                },
                {
                    "field_id": 2637222,
                    "field_value": qSeverity
                },
                {
                    "field_id": 2637230,
                    "field_value": qStatus
                }
                
            ];

            allDefects.push(defectProps);
        }
        // console.log(JSON.stringify(allDefects));
        helpers.submitDefect(allDefects);
    },

    submitDefect: function(defectList){
        console.log("submitting...");
        // console.log(JSON.stringify(defectList));
        // console.log(sessionStorage.getItem("uri"));
        var sessionURI = sessionStorage.getItem("uri");
        var projectID = "45705";
        var url = sessionURI + "api/v3/projects/"+projectID+"/defects";

        for (var i = 0; i < defectList.length; i++){
            
            var data = {
                "properties": defectList[i]
            };

            const header = {
                "Authorization": "bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin" :

            }

            const obj = {
                method: "POST", // or "PUT"
                headers: header,
                body: data
            }


            // fetch(url, obj).then(res => res.json())
            //     .catch(error => console.error("Error:", error))
            //     .then(response => {
            //         console.log(response);
            //     });
            console.log(JSON.stringify(obj.body));
        }

    }

};

module.exports = helpers;