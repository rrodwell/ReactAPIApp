$(document).ready(function (){
    
    $('#sign-in').on('click', function(){

        console.log('Login Button clicked')

        let employeeCredentials = {
            uri: 'https://chickfila.qtestnet.com/',
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value.trim()
        };


        sessionStorage.setItem('uri', employeeCredentials.uri);

        let url = employeeCredentials.uri + 'api/v3/projects/45705/test-cases';
        // https://chickfila.qtestnet.com/api/v3/projects/{{ProjectID}}/test-cases

        let data = JSON.stringify({
            'grant_type': 'password',
            'username': employeeCredentials.email,
            'password': employeeCredentials.password,
        });

        let header = {
            'Authorization': 'bearer a99972bc-88a0-4f7a-8115-16dfe31e69a6',
            'Content-Type': 'application/json',
        };

        let obj = {
            method: 'POST',
            headers: header,
            body: data,
        }


        let token;

        // fetch(url, obj).then(res => res.json())
        //     .catch(error => console.error('Error:', error))
        //     .then(loginResponse => {
        //         if (loginResponse.access_token != null) {
        //             token = loginResponse.access_token;
        //             console.log('Token', token);
        //             sessionStorage.setItem('token', token);
        //         } else {
        //             alert('Incorrect Credentials!')
        //         }
        //         // console.log(loginResponse)
        //     });


        $.ajax({
            type: 'GET',
            url: url, // the endpoint
            headers: header,
            // data: data,

            success: function (response) {
                console.log(response)
                console.log('login successful!');
            }
        });

    });
});