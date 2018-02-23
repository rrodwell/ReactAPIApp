import React, { Component } from 'react';

class Okta extends Component {
    constructor() {
        super();

    }

    componentDidMount() {
        window.scrollTo(0, 0);

        var orgUrl = 'https://cfahome.com/';
        var redirectUrl = 'http://ryanrodwell.com';
        var oktaSignIn = new OktaSignIn({
            baseUrl: orgUrl
        });

        oktaSignIn.renderEl({
            el: '#okta-login-container'
        },
            function (res) {
                if (res.status === 'SUCCESS') {
                    res.session.setCookieAndRedirect(redirectUrl);
                }
            }
        );
    }

    render() {
        return (
            <div id="okta-login-container"></div>
        )
    }
};

export default Okta;