//Packages
import fetch from "isomorphic-fetch";
import base64 from 'base-64';
import qs from 'qs';
import Papa from "papaparse";

const helpers = {


    authenticateUser: function(credentials) {

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
            method: "POST",
            headers: header,
            body: data
        }


        let token;

        fetch(url, obj).then(res => res.json())
            .catch(error => console.error("Error:", error))
            .then(loginResponse => {
                if (loginResponse.access_token != null){
                    token = loginResponse.access_token;
                    console.log("Token", token);
                    sessionStorage.setItem("token",token);
                } else {
                    alert("Incorrect Credentials!")
                }
            });
    },

    createDefects: function(defectsArr) {

        var allDefects =[];

        for(var i =0; i < defectsArr.length-1; i++){

            var key = defectsArr[i].Key;
            var summary = defectsArr[i].Summary;
            var description = defectsArr[i].Description;
            var label = defectsArr[i].Labels;
            var status = defectsArr[i].Status;
            var priority = defectsArr[i].Priority;
            var created = defectsArr[i].Created;
            var creator = defectsArr[i].Creator;
            var version = defectsArr[i].AffectedVersion;

            var newLine = "\n";

            var qTitle = key.concat(": ", summary);
            var qDescription = description.concat(newLine,newLine,"Version: ",version, newLine,"Labels: ", label, newLine, "Creator: ", creator, newLine, "Created At: ", created);
            var qStatus = "";
            var qSeverity = "";

            //Set qTest Severity 
            if (priority == "1.Critical"){
                qSeverity = 10305;
            } else if (priority == "2.High"){
                qSeverity = 10304;
            } else if (priority == "3.Medium"){
                qSeverity = 10303;
            } else if (priority == "4.Low") {
                qSeverity = 10302;
            } else {
                qSeverity = 10301;
            }

            //Set qTest Status 
            // if (status == "Open") {
            //     qStatus = 10001;
            // } else 
            
            if (status == "Closed") {
                qStatus = 10005;
            } else if (status == "Watch") {
                qStatus = 1108485;
            } else if (status == "Rejected") {
                qStatus = 10004;
            } else {
                qStatus = 10001;
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

        helpers.submitDefect(allDefects);
        // console.log(defectProps);
    },

    submitDefect: function(defectList){
        console.log("submitting...");
        
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
                body: JSON.stringify(data),
            }

            // console.log("Data:", data);

            // fetch(url, obj).then(res => res.json())
            //     .catch(error => console.error("Error:", error))
            //     .then(response => {
            //         console.log(response);
            //         // console.log(obj.body.qTitle);
            //     });
            console.log(JSON.stringify(obj.body));
        }

    }

};

module.exports = helpers;