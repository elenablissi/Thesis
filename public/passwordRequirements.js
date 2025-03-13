/*
Functions for password
requirements

@author Elena Blisi
*/


// Get the Fields

// Password input field
var myInput = document.getElementById('user-password');
// Container for password error messages
var passwordErrorMsg =  document.getElementById("password-error");
// Indicator for lowercase letters
var letter = document.getElementById('letter');
// Indicator for uppercase letter
var capital = document.getElementById('capital');
// Indicator for numbers
var number = document.getElementById('number');
// Indicator for length
var length = document.getElementById('length');


// Show password requirements when the input field is focused
myInput.addEventListener('focus', function() {
    passwordErrorMsg.classList.remove("d-none"); // Remove 'd-none' class to display password requirements
});

// Hide password requirements when the input field loses focus
myInput.addEventListener('blur', function() {
    passwordErrorMsg.classList.add("d-none"); // Add 'd-none' class to hide password requirements
});

// Check the requirements on each key press
myInput.addEventListener('keyup', function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {
        letter.classList.add("valid"); // Add 'valid' class if lowercase letters are present
        letter.classList.remove("invalid"); // Remove 'invalid' class
    } else {
        letter.classList.add("invalid"); // Add 'invalid' class if lowercase letters are not present
        letter.classList.remove("valid"); // Remove 'valid' class
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {
        capital.classList.add("valid");
        capital.classList.remove("invalid");
    } else {
        capital.classList.add("invalid");
        capital.classList.remove("valid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {
        number.classList.add("valid");
        number.classList.remove("invalid");
    } else {
        number.classList.add("invalid");
        number.classList.remove("valid");
    }

    // Validate length
    if(myInput.value.length >= 8) {
        length.classList.add("valid");
        length.classList.remove("invalid");
    } else {
        length.classList.add("invalid");
        length.classList.remove("valid");
    }
});