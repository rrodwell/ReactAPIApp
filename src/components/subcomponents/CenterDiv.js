import React from 'react';

const styles = {
    decoration: {
        textDecoration: 'underline'
    }

}

const CenterDiv = props => (
    <div className="container-body  registerForm center-align">
        <img className="logo" src="./assets/img/CFA_ScriptLogo/Red/CFA_ScriptLogo_Red_RGB.png"/>
            <div className="row">
                <form className="col s9">
                    <div className="row">
                        <div className="input-field col s12">

                        </div>
                    </div>
                    <div className="row loginPassword">
                        <div className="input-field col s12">

                        </div>
                        <a href="/updatepassword">Forgot Password?</a>
                    </div>
                </form>
            </div>
            <div>
            <p>Don't have an account?  <a href="/register" style={styles.decoration}>Register</a></p>
            </div>
    </div>
);

export default CenterDiv;