document.addEventListener("DOMContentLoaded", function() {

    setEmailEvent();
});


function setEmailEvent(){
    
////////////////////////////////////////
// Hide and reveal Email
////////////////////////////////////////

    // Base64 encoded version of the email address 'you@example.com'
    var encodedEmail = 'bWFnLm5ldDIwNUBzbG1haWxzLmNvbQ==';

    // Get the email display element
    var emailDisplayElement = document.getElementById('contact-email');

    if(!emailDisplayElement){
        console.warn('Email display element not found');
        return none;
    }

    // Add click event listener to the element
    emailDisplayElement.addEventListener('click', function() {
    // Decode the Base64 string to get the email address
    var decodedEmail = atob(encodedEmail);

    // Update the element to the decoded email address
    const emailElement = emailDisplayElement; //emailDisplayElement.querySelector('a');
    emailDisplayElement.textContent = decodedEmail;
//    emailElement.setAttribute('href', 'mailto:' + decodedEmail);

    });

    return emailDisplayElement

}
