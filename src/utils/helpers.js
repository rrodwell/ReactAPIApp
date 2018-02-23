//Packages
import fetch from "isomorphic-fetch";
import base64 from 'base-64';
import qs from 'qs';
import axios from "axios";

//Require keys
import keys from "../../qTestKeys";

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
            "Content-Type": "application/x-www-form-urlencoded"
        }

        const obj = {
            method: "POST", // or "PUT"
            headers: header,
            body: data,
            mode: "no-cors"
        }


        let token;

        fetch(url, obj).then(res => res)
            .catch(error => console.error("Error:", error))
            .then(loginResponse => {
                token = loginResponse.access_token;
                console.log("Success:", JSON.stringify(loginResponse));
            });

        console.log("Token",token);
        console.log("URL", url);
        console.log("Data", data);
        console.log("Header", header);
        console.log("Obj", obj);
    },

    // axiosAuthenticateUser: function (credentials) {
    //     return axios.post("/auth/login", credentials).then(function (status) {
    //         if (status.data.success) {
    //             if (status.data.auth_lvl === "employee" && status.data.isNew === true) {
    //                 return "/employee/update/password";
    //             } else if (status.data.auth_lvl === "employee" && status.data.isNew === false) {
    //                 return "/employee/welcome";
    //             } else {
    //                 return "/admin";
    //             }
    //         } else {
    //             console.log(status.data.message);
    //         }
    //     });
    // },

    // getEmployeeData: function () {
    //     return axios.get("/employee/data").then(function (data) {
    //         return data;
    //     });
    // },

    // postEmployeeData: function (data) {
    //     return axios.post("/employee/data", data).then(function (status) {
    //         if (status.data.success) {
    //             return "Update success.";
    //         }
    //     });
    // },

    // logout: function () {
    //     return axios.get("/auth/logout").then(function (status) {
    //         if (status.data.success) {
    //             return "/";
    //         }
    //     });
    // }
};

module.exports = helpers;