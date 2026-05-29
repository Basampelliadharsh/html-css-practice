document.addEventListener('DOMContentLoaded', () => {
    const myForm = document.querySelector('form');

    // Get references to individual input elements by their ID
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const ageInput = document.getElementById('age');
    const messageTextarea = document.getElementById('message');
    const countrySelect = document.getElementById('country');

    // Get references to radio button groups and checkboxes
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]');

    // Get references to error message spans
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const ageError = document.getElementById('ageError');
    const messageError = document.getElementById('messageError');
    const countryError = document.getElementById('countryError');
    const genderError = document.getElementById('genderError');
    const interestsError = document.getElementById('interestsError');

    // Get references to buttons
    const submitButton = myForm.querySelector('button[type="submit"]');
    const resetButton = myForm.querySelector('button[type="reset"]');
    console.log("Reset Button Element:", resetButton); // Added for debugging

    // Helper functions to manage error display
    function displayError(element, message) {
        element.textContent = message;
        // Optionally add a class to the input field itself for visual highlight
        const inputElement = document.getElementById(element.id.replace('Error', ''));
        if (inputElement) {
            inputElement.classList.add('invalid');
        }
    }

    function clearError(element) {
        element.textContent = '';
        const inputElement = document.getElementById(element.id.replace('Error', ''));
        if (inputElement) {
            inputElement.classList.remove('invalid');
        }
    }

    // --- Main Validation Logic --- //
    function validateForm() {
        let isValid = true; // Assume valid until a rule is broken

        // 1. Full Name Validation
        if (fullNameInput.value.trim() === '') {
            displayError(fullNameError, 'Full Name is required.');
            isValid = false;
        } else if (fullNameInput.value.trim().length < 3) {
            displayError(fullNameError, 'Full Name must be at least 3 characters.');
            isValid = false;
        } else {
            clearError(fullNameError);
        }

        // 2. Email Validation
        const emailPattern = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/;
        if (emailInput.value.trim() === '') {
            displayError(emailError, 'Email Address is required.');
            isValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            displayError(emailError, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(emailError);
        }

        // 3. Password Validation
        if (passwordInput.value === '') {
            displayError(passwordError, 'Password is required.');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            displayError(passwordError, 'Password must be at least 8 characters.');
            isValid = false;
        } else {
            clearError(passwordError);
        }

        // 4. Age Validation
        const age = parseInt(ageInput.value);
        if (isNaN(age) || ageInput.value.trim() === '') {
            displayError(ageError, 'Age is required and must be a number.');
            isValid = false;
        } else if (age < 18 || age > 99) {
            displayError(ageError, 'Age must be between 18 and 99.');
            isValid = false;
        } else {
            clearError(ageError);
        }

        // 5. Country Validation
        if (countrySelect.value === '') {
            displayError(countryError, 'Please select a country.');
            isValid = false;
        } else {
            clearError(countryError);
        }

        // 6. Gender Validation (at least one must be selected)
        let isGenderSelected = Array.from(genderRadios).some(radio => radio.checked);
        if (!isGenderSelected) {
            displayError(genderError, 'Please select your gender.');
            isValid = false;
        } else {
            clearError(genderError);
        }

        // 7. Interests Validation (at least one must be selected)
        let isInterestSelected = Array.from(interestCheckboxes).some(checkbox => checkbox.checked);
        if (!isInterestSelected) {
            displayError(interestsError, 'Please select at least one interest.');
            isValid = false;
        } else {
            clearError(interestsError);
        }
        
        // Message textarea is optional in this example, so no validation here
        clearError(messageError);

        return isValid;
    }

    myForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Always prevent default form submission

        if (validateForm()) {
            // If JavaScript validation passes, then proceed with data collection and submission logic
            const formData = {
                fullName: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value, // Keep raw password for demo, but secure in real app!
                age: parseInt(ageInput.value) || null,
                message: messageTextarea.value.trim(),
                country: countrySelect.value,
                gender: document.querySelector('input[name="gender"]:checked')?.value || null,
                interests: Array.from(interestCheckboxes).filter(cb => cb.checked).map(cb => cb.value)
            };

            console.log('--- Form Submitted Successfully! ---');
            console.log(formData);

            alert('Form submitted successfully! Check console for data.');
            // Optionally, reset the form after successful submission
            // myForm.reset(); // This will clear all fields
            // clearAllErrors(); // You might want a function to clear all visible errors too
        } else {
            console.log('--- Form Validation Failed! ---');
        }
    });

    // Optional: Add real-time validation feedback on input blur or input event
    // For simplicity, we'll stick to submit-time validation here.
    // You could add: fullNameInput.addEventListener('blur', () => validateForm());

    if (resetButton) { // Check if resetButton is found before adding listener
        resetButton.addEventListener('click', () => {
            console.log('Form has been reset.');
            // Clear any displayed errors after reset
            const allErrors = document.querySelectorAll('.error-message');
            allErrors.forEach(errorSpan => clearError(errorSpan));
            const allInvalidInputs = document.querySelectorAll('input.invalid, select.invalid, textarea.invalid');
            allInvalidInputs.forEach(input => input.classList.remove('invalid'));
        });
    }

    console.log("forms_script.js loaded and ready!");
});