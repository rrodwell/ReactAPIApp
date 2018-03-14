import React, { Component } from 'react';

class Okta extends Component {
    constructor() {
        super();

    }

    componentDidMount() {
        window.scrollTo(0, 0);

        let orgUrl = 'https://cfahome.com/';
        let redirectUrl = 'http://ryanrodwell.com';
        let oktaSignIn = new OktaSignIn({
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