//Packages
import fetch from "isomorphic-fetch";
import base64 from 'base-64';
import qs from 'qs';
import Papa from "papaparse";

const helpers = {


    authenticateUser: function(credentials) {
        console.log("clicked")
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

    parseFile: function(files){

		if (files.length > 0)
		{

			Papa.parse(filePath,{
				config: {
                    header: true,
                    complete: helpers.completeFn,
		            error: helpers.errorFn,
                },
				before: function(file, inputElem)
				{
					console.log("Parsing file:", file);
				},
				complete: function()
				{
					console.log("Done with all files.");
				}
			});
		}
		else
		{
			console.log("Upload a file that has stuff in it!");
		}
    },

    buildConfig: function(){
        return {
            // delimiter: $('#delimiter').val(),
            // newline: getLineEnding(),
            header: true,
            // dynamicTyping: $('#dynamicTyping').prop('checked'),
            // preview: parseInt($('#preview').val() || 0),
            // step: $('#stream').prop('checked') ? stepFn : undefined,
            // encoding: $('#encoding').val(),
            // worker: $('#worker').prop('checked'),
            // comments: $('#comments').val(),
            complete: helpers.completeFn(),
            error: helpers.errorFn(),
            // download: $('#download').prop('checked'),
            // fastMode: $('#fastmode').prop('checked'),
            // skipEmptyLines: $('#skipEmptyLines').prop('checked'),
            // chunk: $('#chunk').prop('checked') ? chunkFn : undefined,
            // beforeFirstChunk: undefined,
        };

    },
    errorFn: function(error, file) {

        console.log("ERROR:", error, file);
    },

    completeFn: function() {

        rows = arguments[0].data.length;

        console.log("Results: ", arguments[0].data);
        console.log("Rows:", rows);
    },

};

module.exports = helpers;