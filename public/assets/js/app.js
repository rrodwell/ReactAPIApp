$("#login-api").on("click", function(){

    console.log("Login Button clicked")
    const url = "https://chickfila.qtestnet.com/oauth/token";

    const data = qs.stringify({
        "grant_type": "password",
        "username": "ryanrodwell@gmail.com",
        "password": "eg85CFA!",
    });

    const header = {
        "Authorization": "Basic cnlhbnJvZHdlbGxAZ21haWwuY29tOg==",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    const obj = {
        method: "POST", // or "PUT"
        headers: header,
        body: data
    }


    let token;

    // fetch(url, obj).then(res => res)
    //     .catch(error => console.error("Error:", error))
    //     .then(loginResponse => {
    //         token = loginResponse.access_token;
    //         console.log("Success:", JSON.stringify(loginResponse));
    //     });

    $.ajax({
        type: "POST",
        url: url, // the endpoint
        data: obj,

        success: function (response) {
            console.log(response)
            console.log("login successful!");
        }

    });
});