var OKTA_USERNAME_FIELD_ID = "okta-signin-username";
var lastPageRendered;

/**
 *
 * @param message
 */
function logToConsole(message) {
    // the if-condition is just for old IE versions lacking a console
    if (window.console && window.console.log) {
        console.log(message);
    }
}

/**
 *
 */
function modifyFormToCfaStandards() {

    $("#okta-signin-username").attr("placeholder", "Log-in ID");
    $("#okta-signin-submit").attr("value", 'Login');
    document.getElementById("okta-signin-submit").val = "Login";

}

/**
 *
 */
function closeCurrentOktaSession(oktaCloseSessionUrl) {

    $.ajax({
        url: oktaCloseSessionUrl,
        type: 'DELETE',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        },
        success: function (result) {
            /* The result will always be a non-200 error code, so this handler should never be called */
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // 400 or 204 are the expected results.  Anything else represents a real error
            if ((jqXHR.status !== 400) && (jqXHR.status !== 204))
                logToConsole("Error in reset call. Status Code: " + jqXHR.status +
                    " Response: " + jqXHR.responseText);

        }
    });
}

/**
 *
 */
function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 *
 */
function setupBarcodePushUI() {
	$(".scan-instructions-details").html('<ul><li>Launch Okta Verify on your mobile device.</li><li>Select Add an Account.</li><li>Scan the barcode.</li></ul>');
}

/**
 *
 */
function setupSMSPushUI() {
    resetOriginalFormHeight();
	$(".o-form-content").prepend('<div><p>SMS Authentication Setup:<div class="spacer"></div></p><ul class="noindent"><li>Enter your phone number. Select Send code.</li><li>Input the code sent to your device.</li><li>Select Verify.</li></ul><div class="spacer"></div></div>');

}


/**
 *
 */
function extractUrlFromInstructions(str) {
	
  var url;
  if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(str.html())) {
    console.log(str);
    url = str.find("a").attr("href");
  }
  return url;
}

/**
 *
 */
function scanForMobileDeviceSelectionFormChanges() {
	
	        var interval = setInterval(function () {

            if ($('.instructions-title').is(':visible')) {
                
               clearInterval(interval);
       		   $('.instructions-title').hide();
			   logToConsole('Instructions hidden');
			   var instructions = $('.instructions');
			   var url = extractUrlFromInstructions(instructions);
			   if (url.indexOf("itunes") !== -1) {
				   var newInstructions = "Go to the " + "<a href=\"" +  url + "\">" +
				   "App Store</a> and download Okta Verify to your mobile device.";
				   $('.instructions').html(newInstructions);
			   } else {
				  var newInstructions = "Go to the " + "<a href=\"" +  url + "\">" +
				   "Google Play Store</a> and download Okta Verify to your mobile device.";
				   $('.instructions').html(newInstructions); 
			   } 
	   
                
            }
        }, 200);
	
}

/**
 *
 */
function setupMobileDeviceSelection() {
    resetOriginalFormHeight();
   // Move the apple/google icons closer.  No, this will not work with CSS before rendering; don't know why.
   $('.o-form-input-name-__deviceType__').css("width",175);
   $('.o-form-input-name-__deviceType__').css("display","table");
   $('.o-form-input-name-__deviceType__').css("margin","0 auto");

	scanForMobileDeviceSelectionFormChanges();
}

/**
 *
 */
function setupEmailVerification() {
	$('.o-form-content').prepend('<h2 style="display:table;margin:0 auto;">Enroll in MFA with Email Address</h2><div class="spacer"></div>');
}

/**
 *
 */
function setupEnrollChoicesSelection() {

    var url = "mailto:oktaadmins@chick-fil-a.com?subject=Email as a factor request";
    var caption = "<div><p>If you do not have a mobile device, send an <u><a href=\"" +
        url + "\">" +
        "email to Chick-fil-A\'s Okta Administrators</a></u> and ask " +
        "to have your account setup for email as your multi-factor choice. Be sure to include your @Chick-fil-A " +
        "username and Restaurant number in the body of the email message. <b style='font-weight: bold;'>You will receive a return email when " +
        "your account is ready.</b></p><div class=\"spacer\"></div><b style='font-weight: bold;'>OktaAdmins@chick-fil-a.com</b></div>";

    $('.o-form-content').append('<div id="emailInstructions"></div>');
    $('#emailInstructions').html(caption);

}


/**
 *
 * @param pageName
 */
function onOktaPageRendered(pageName) {
    logToConsole('page name: ' + pageName);
	lastPageRendered = pageName;
	
	if ('barcode-push' === pageName)
	  setupBarcodePushUI();
    else if ('enroll-totp' === pageName) 
   	  setupMobileDeviceSelection();
    else if ('enroll-choices' === pageName)
        setupEnrollChoicesSelection();
    else if ('mfa-verify' === pageName)
	  setupEmailVerification();	
    else if (isFunction(pageName))  // SMS setup page doesn't sent pageName but a function, possible Okta bug
	  setupSMSPushUI();	
    
	
}

/**
 *
 * @param orgUrl
 */
function renderOktaWidget(orgBaseUrl, oktaIdpSsoUrl) {

    var oktaSignIn = new OktaSignIn({
        baseUrl: orgBaseUrl,
        features: {
            multiOptionalFactorEnroll: true,
            rememberMe : false
        },
        language: 'en',
        i18n: {
            // Overriding English properties
            'en': {
                //'enroll.totp.downloadApp': 'Go to the {2} and <a href="{0}" class="inline-link">download Okta Verify</a> to your mobile device.',
                //'enroll.totp.installApp': '',
                'mfa.backToFactors': 'Previous Page',
                'mfa.scanBarcode' : 'MFA via Push Notification Setup',
 //               'enroll.totp.setupApp' : '&lt;li&gt;&lt;ul&gt;Launch Okta Verify on your mobile device.&lt;/ul&gt;&lt;ul&gt;Select Add an Account.&lt;/ul&gt;&lt;ul&gt;Scan the barcode.&lt;/ul&gt;&lt;/li&gt;',
                'enroll.totp.selectDevice' : 'Select your device type.',
                'enroll.choices.description' : 'Chick-fil-A requires multi-factor authentication (MFA) as added security for your account. Begin Okta enrollment by selecting an MFA option below.'
            }
        }
    });

    oktaSignIn.on('pageRendered', function (data) {
      onOktaPageRendered(data.page);

    });

    oktaSignIn.renderEl(
        {el: '#okta-login-container'},
        function (res) {
            if (res.status === 'SUCCESS') {
                res.session.setCookieAndRedirect(oktaIdpSsoUrl);
            }
        },
        function error(err) {

            //alert(err);
            // The widget will handle most types of errors - for example, if the user
            // enters an invalid password or there are issues authenticating.
            //
            // This function is invoked with errors the widget cannot recover from:
            // 1. Known errors: CONFIG_ERROR, UNSUPPORTED_BROWSER_ERROR, OAUTH_ERROR
            // 2. Uncaught exceptions
        }
    );
}


/**
 *
 * @param oktaUsername
 */
function resubmitLogin(oktaUsername) {
    $("#" + OKTA_USERNAME_FIELD_ID).val(oktaUsername);
    var loginButton = document.getElementById("okta-signin-submit");
    if (loginButton === null)
        logToConsole("Error: Okta sign-in button doesn't exist");
    else
        loginButton.click();
}

/**
 *
 * @param emailAddress
 */
function lookupOktaUsernameAndResubmit(emailAddress) {

    $.ajax({
        url: '/login/user/v1/oktausername',
        data: "emailAddress=" + encodeURIComponent(emailAddress),
        dataType: 'json',
        type: 'GET',
        context: this,
        success: function (result) {
            var oktaUsername = result.oktaUsername;
            if (oktaUsername == null) {
                logToConsole("Warn: Lookup of email address " + emailAddress + " returns no value.");
            } else {
                if (oktaUsername !== emailAddress)
                    resubmitLogin(oktaUsername);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // these errors are meaningless to end-user, so we just log to console and fail silently.
            logToConsole("Error in username lookup call. Status Code: " + jqXHR.status +
                " Response: " + jqXHR.responseText);

        }
    });

}

/**
 *
 */
function lookupUsernameAndRetry() {

    var emailAddress = $("#" + OKTA_USERNAME_FIELD_ID).val();

    if (emailAddress && $("#okta-signin-password").val()) {
        // only lookup if both fields are non-empty.  Otherwise failure is due to one of the fields being empty

        if (emailAddress.indexOf('@') !== -1) { // verify that it actually is an email address
            lookupOktaUsernameAndResubmit(emailAddress);
        }
    }

}


var maxFallbackLoginLookups = 1; // perform the server side call only once per page load
var fallbackLoginLookupsCount = 0;
var maxTimeToCheckBeforeStopping = 200000; // milliseconds after which we stop checking for the auth failure caption
var timeElapsed = 0;

/**
 * If an auth failure message and the username is an email address, lookup Okta username from server and
 * resubmit form if that username differs from email address.
 */
function initAuthFailureChecking() {

    // Only perform the login failure lookup once per page load
    if (fallbackLoginLookupsCount < maxFallbackLoginLookups) {

        var interval = setInterval(function () {

            if ($('.infobox-error').is(':visible')) {
                var text = $('.infobox-error').find("p").text();
                if ('Sign in failed!' === text) {
                    // The error div is visible and it's an auth error
                    clearInterval(interval);
                    fallbackLoginLookupsCount++;
                    lookupUsernameAndRetry();
                }
            } else {
                if (timeElapsed > maxTimeToCheckBeforeStopping) {
                    // still hidden, after 10 seconds, stop checking
                    clearInterval(interval);
                    return;
                }

                // not visible yet, do something
                timeElapsed += 200;
            }
        }, 200);
    }
}