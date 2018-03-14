//Packages
import fetch from 'isomorphic-fetch';
import base64 from 'base-64';
import qs from 'qs';

const helpers = {


    authenticateUser: function(credentials) {

        sessionStorage.setItem('uri', credentials.uri);

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        let url = credentials.uri + 'oauth/token';

        let data = qs.stringify({
            'grant_type': 'password',
            'username': credentials.email,
            'password': credentials.password,
        });

        let header = {
            'Authorization': 'Basic ' + base64.encode(credentials.email + ':'),
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        let obj = {
            method: 'POST',
            headers: header,
            body: data,
        }


        let token;

        fetch(proxyurl+url, obj)
            .then(res => res.json())
            .then(loginResponse => {
                if (loginResponse.access_token != null){
                    token = loginResponse.access_token;
                    console.log('Token', token);
                    sessionStorage.setItem('token',token);
                } else {
                    alert('Incorrect Credentials!')
                }
                // console.log(loginResponse)
            })
            .catch(error => console.error('Error:', error));
    },

    createDefects: function(defectsArr) {

        let allDefects =[];

        for(let i =0; i < defectsArr.length-1; i++){

            let key = defectsArr[i].Key;
            let summary = defectsArr[i].Summary;
            let description = defectsArr[i].Description;
            let label = defectsArr[i].Labels;
            let status = defectsArr[i].Status;
            let priority = defectsArr[i].Priority;
            let created = defectsArr[i].Created;
            let creator = defectsArr[i].Creator;
            let version = defectsArr[i].AffectedVersion;

            let newLine = '\n';

            let qTitle = key.concat(': ', summary);
            let qDescription = description.concat(newLine,newLine,'Version: ',version, newLine,'Labels: ', label, newLine, 'Creator: ', creator, newLine, 'Created At: ', created);
            let qStatus = '';
            let qSeverity = '';

            //Set qTest Severity
            if (priority == '1.Critical'){
                qSeverity = 10305;
            } else if (priority == '2.High'){
                qSeverity = 10304;
            } else if (priority == '3.Medium'){
                qSeverity = 10303;
            } else if (priority == '4.Low') {
                qSeverity = 10302;
            } else {
                qSeverity = 10301;
            }

            //Set qTest Status
            // if (status == 'Open') {
            //     qStatus = 10001;
            // } else

            if (status == 'Closed') {
                qStatus = 10005;
            } else if (status == 'Watch') {
                qStatus = 1108485;
            } else if (status == 'Resolved') {
                qStatus = 10005;
            } else {
                qStatus = 10001;
            }

            let defectProps = [
                {
                    'field_id': 2637217,
                    'field_value': qTitle
                },
                {
                    'field_id': 2637220,
                    'field_value': qDescription
                },
                {
                    'field_id': 2637222,
                    'field_value': qSeverity
                },
                {
                    'field_id': 2637230,
                    'field_value': qStatus
                }

            ];

            allDefects.push(defectProps);
        }

        helpers.submitDefect(allDefects);
        // console.log(defectProps);
    },

    submitDefect: function(defectList){
        console.log('submitting...');

        let sessionURI = sessionStorage.getItem('uri');
        let projectID = '45705';

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        let url = sessionURI + 'api/v3/projects/'+projectID+'/defects';

        for (let i = 0; i < defectList.length; i++){

            let data = {
                'properties': defectList[i]
            };

            let header = {
                'Authorization': 'bearer ' + sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            }

            let obj = {
                method: 'POST', // or 'PUT'
                headers: header,
                body: JSON.stringify(data),
            }

            // console.log('Data:', data);

            fetch(proxyurl+url, obj)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    // console.log(obj.body.qTitle);
                })
                .catch(error => console.error('Error:', error));
            // console.log(obj.body);
        }

    },

    createTestCase: function (testCaseArr) {

        let allTestCases = [];
        let count = 0;

        for (let i = 0; i < testCaseArr.length; i++) {

            let project = testCaseArr[i].Project;
            let key = testCaseArr[i].Key;
            let summary = testCaseArr[i].Summary;
            let description = testCaseArr[i].Description;

            let fullTestCase = {
                'name': '',
                'test_steps': [], //Array
                'parent_id': 4541473, //ID number
                'description': '',
            };


            if(project != ''){

                count += 1;
                fullTestCase.name = project.concat(': ',key, ' ', summary);
                fullTestCase.description = description;

                allTestCases.push(fullTestCase);

            } else {

                let steps = {
                    'description': testCaseArr[i].TestStep + ' | Test Data: ' + testCaseArr[i].TestData,
                    'expected': testCaseArr[i].ExpectedResult
                };

                allTestCases[count-1].test_steps.push(steps);
            }

        }

        helpers.submitTestCase(allTestCases);
        console.log('All Test:',allTestCases);

    },

    submitTestCase: function(testcases) {
        console.log('submitting...');

        let sessionURI = sessionStorage.getItem('uri');
        let projectID = '45705';

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        let url = sessionURI + 'api/v3/projects/'+projectID+'/test-cases';


        for (let i = 0; i < testcases.length; i++){

            let header = {
                'Authorization': 'bearer ' + sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            }

            let obj = {
                method: 'POST', // or 'PUT'
                headers: header,
                body: JSON.stringify(testcases[i]),
            }

            fetch(url, obj)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.error('Error:', error));
            // console.log(JSON.stringify(obj.body));
        }
    },

};

module.exports = helpers;