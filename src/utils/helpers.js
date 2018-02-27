//Packages
import fetch from "isomorphic-fetch";
import base64 from 'base-64';
import qs from 'qs';
import axios from "axios";

//Require keys
// import keys from "../../qTestKeys";

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