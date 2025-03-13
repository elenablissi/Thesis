/*
Frontend JavaScript
Functions

@author Elena Blisi
*/


// Scroll to top button functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Empty the span and add loader
function loadLoader() {
    let container = document.getElementById("submit-icon");
    let btn = document.getElementById("submit-btn");
    btn.disabled = true;
    container.innerHTML = "";
    container.classList.add("loader");
}


// Show the service details in the details container
function showServiceDetails(id) {     
    // Get the template and the display container
    const div = document.getElementById(`details-${id}`);

    // Hide the services navigation links
    servicesLinks.style.display = "none";

    // Clone/duplicate the template
    const clonedDiv = div.cloneNode(true);
    clonedDiv.classList.remove("d-none");

    // Add the copied/cloned div containing the details
    detailsContainer.appendChild(clonedDiv);  
}


// Go back to all services
function viewAllServices(){
    // Show the services navigation links
    servicesLinks.style.display = 'flex';

    // Clear the service details
    detailsContainer.innerHTML = "";        
}


// Check if passwords match
function matchPasswords() {
    // Get the passwords
    const password = document.getElementById('user-password').value;
    const confirmPassword = document.getElementById('confirm-user-password').value;

    // Get error message
    const errorPassword = document.getElementById('confirm-password-error');
    
    // Check if passwords match
    if (password !== confirmPassword) {
        errorPassword.classList.remove('d-none');
        return false;
    } else {
        return true;
    }
}


// Checks if user email is already in database 
function validEmail(existingEmailsString) {
   var existingEmails = existingEmailsString.split(",").map(value => value.trim());

   // Get the email field
   var emailEl = document.getElementById('user-email');
   var email = document.getElementById('user-email');

   var errorEmail = document.getElementById('email-error');
    
    // Check if the email is already in the list of existing emails
    var emailExists = existingEmails.includes(email.value);

    if (emailExists) {
        // Show error message if email exists
        errorEmail.classList.remove('d-none');
        return false;
    } else {
        // Hide error message if email is valid
        errorEmail.classList.add('d-none');
        return true;
    }
}


// Change dial code based on Country
function setDialCode() {
    const currentCountry = document.getElementById("country");
    let dialCodeField = document.getElementById("telephone-code");
    dialCodeField.value = currentCountry.value;
}


function setPhoneNumber(fullPhoneNumber) {
    var phoneInput = document.getElementById("user-telephone");

    // Check if the phoneInput exists and has a value
    if (fullPhoneNumber) {
        var splitPhoneNumber = fullPhoneNumber.split(" ");

        // Check if the split operation returns more than one part
        if (splitPhoneNumber.length > 1) {
            phoneInput.value = splitPhoneNumber.slice(1).join(" ");
        }
    }
}


// Stores the whole phone number with dial code
function setFullPhoneNumber() {
    const dialCode = document.getElementById("telephone-code").value;
    const phoneNumber = document.getElementById("user-telephone").value;
    document.getElementById("full-phone-number").value = `${dialCode} ${phoneNumber}`;
}


function validateForm(existingEmails) {

    // Check if passwords match
    if (!matchPasswords()) {
        return false;
    }

    // Check if email is existing user
    if (!validEmail(existingEmails)) {
        return false;
    }

    // If everything is correct, update the phone number field and allow form submission
    setFullPhoneNumber();
    return true;
}


// Checks if all required form fields are full before navigating to the next form page
function formValidation(currentStep) {
    // Find all required input fields within the form
    const currentPage = document.querySelectorAll(`#step-${currentStep}`);
    const requiredFields = currentPage[0].querySelectorAll('[required]');
    let allFieldsValid = true;

    // Loop through all required fields and check if they are filled
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            // Change placeholder color to red if the field is empty
            field.classList.add("invalid-field");
            allFieldsValid = false;
        }
        else {
            // Change placeholder color to black if the user inserted data
            field.classList.remove("invalid-field");
        }
    });

    // Return true if all fields are valid, otherwise false
    return allFieldsValid; 
}


// Get the phone number without dial code
function getClearPhoneNumber(fullPhoneNumber) {
    return fullPhoneNumber.split(" ")[1];
}


// Checks for validation address and mark on map
function addressValidation() {
    const link = document.getElementById('google-maps-url');
    const address = document.getElementById('address');
    const errorSpan = document.getElementById('address-error-code');

    if (!link.value || !address.value) {
        errorSpan.style.display = 'block'; // Show custom error message
        return false; // Prevent form submission
    } else {
        errorSpan.style.display = 'none'; // Hide error message if valid
        return true; 
    }
}


// Navigate throught book form
function formPagination() {
    var currentStep = 1;

    function showStep(step) {
        $('.step-container').removeClass('active');
        $('#step-' + step).addClass('active');
        $('.pagination .page-item').removeClass('active');
        $('.pagination .page-item[data-step="' + step + '"]').addClass('active');
    }

    $('.next-step').click(function() {
        if (formValidation(currentStep)) {
            if(currentStep == 1) {
                setFullPhoneNumber();
            }
            currentStep++;
            showStep(currentStep);
            if (currentStep == 3) {
                initializeMap();
            }
        }
    });

    $('.prev-step').click(function() {
        currentStep--;
        showStep(currentStep);
    });
}


// Past dates unavailable
function hideUnavilableDates() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("date")[0].setAttribute('min', today);
}


// Enables the input on edit account details
function enableForm(form, button) {
    var fields = document.getElementById(form).elements;
    Array.from(fields).forEach(element => {
        element.disabled = false;
    });
    button.disabled = true;
}

// Remove seconds from time
function formatTime(timeString) {
    // Assuming timeString is in 'HH:MM:SS' format
    const parts = timeString.split(':');
    if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
    }
    return timeString; // Return as is if format is unexpected
}