
// JavaScript to apply a gradual color transition to the word cloud items based on weight
document.addEventListener("DOMContentLoaded", function() {
    const HSL_param = "SL"; // Set to "H", "S", or "L" to choose which parameter to change
    const wordCloudItems = document.querySelectorAll(".word-cloud.coloured div");

    function calculateHue(weight) {
        return 200 + ((weight - 1) / 9) * 160; // Hue from 200 to 360 (blue to red spectrum)
    }

    function calculateSaturation(weight) {
        return 50 + ((weight - 1) / 9) * 50; // Saturation from 30% to 80%
    }

    function calculateLightness(weight) {
        return 50 + ((weight - 1) / 9) * 20; // Lightness from 30% to 70%
    }

    // Loop through each item and assign a color based on its weight
    wordCloudItems.forEach((item) => {
        const weight = parseInt(item.style.getPropertyValue('--weight'));
        let hue = 200;
        let saturation = 70;
        let lightness = 50;

        if (HSL_param.includes("H")) {
            hue = calculateHue(weight);
        }
        if (HSL_param.includes("S")) {
            saturation = calculateSaturation(weight);
        }
        if (HSL_param.includes("L")) {
            lightness = calculateLightness(weight);
        }

        item.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });

    setEmailEvent();
});

function toggleTheme() {
            document.body.classList.toggle('dark-mode');
        }

// Generate QR Code
window.addEventListener('load', function() {
    var typeNumber = 0;
    var errorCorrectionLevel = 'L'; // (L)ow, (M)ed, (Q), (H)igh
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    const bookmark = "https://michi05.github.io/card"; //window.location.href;

    qr.addData(bookmark);

    qr.make();
    document.getElementById('qrcode').src = qr.createDataURL();
});

    document.querySelectorAll('.experience-item > div > h5').forEach(header => {
        header.addEventListener('click', () => {
//            header.classList.toggle('expanded');
            header.parentElement.parentElement.toggle('expanded');
        });
    });

//     const top_class = '.experience-item > .title-date';
//     document.querySelectorAll(top_class).forEach(item => {
//     // Create the toggle icon element
//     const toggleIcon = document.createElement('span');
//     toggleIcon.classList.add('toggle-icon');
//     // Insert the toggle icon as the first child of the experience item
//     item.insertBefore(toggleIcon, item.firstChild);

//     // Add click event listener to toggle visibility and icon
//     toggleIcon.addEventListener('click', () => {
//         const header = item.querySelector(top_class + 'h5');
//         header.classList.toggle('expanded');
//         toggleIcon.textContent = header.classList.contains('expanded') ? '-' : '+';
//     });

//     // Set initial state for the collapsible content and icon
//     toggleIcon.textContent = '+';
// });


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
    const emailElement = emailDisplayElement.querySelector('a');
    emailElement.textContent = decodedEmail;
    emailElement.setAttribute('href', 'mailto:' + decodedEmail);

    });

    return emailDisplayElement

}