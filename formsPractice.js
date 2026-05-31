document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    const rememberCheckbox = document.getElementById('rememberMe');
    const formFeedback = document.getElementById('formFeedback');

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    function displayError(element, message) {
        element.textContent = message;
        const input = document.getElementById(element.id.replace('Error', ''));
        if (input) {
            input.classList.add('invalid');
        }
    }

    function clearError(element) {
        element.textContent = '';
        const input = document.getElementById(element.id.replace('Error', ''));
        if (input) {
            input.classList.remove('invalid');
        }
    }

    function clearFeedback() {
        formFeedback.textContent = '';
        formFeedback.classList.add('hidden');
        formFeedback.classList.remove('error');
    }

    function showFeedback(message, isError = false) {
        formFeedback.textContent = message;
        formFeedback.classList.remove('hidden');
        formFeedback.classList.toggle('error', isError);
    }

    function validateForm() {
        let isValid = true;
        clearFeedback();

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value;
        const emailPattern = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

        if (emailValue === '') {
            displayError(emailError, 'Email is required.');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            displayError(emailError, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(emailError);
        }

        if (passwordValue === '') {
            displayError(passwordError, 'Password is required.');
            isValid = false;
        } else if (passwordValue.length < 8) {
            displayError(passwordError, 'Password must be at least 8 characters.');
            isValid = false;
        } else {
            clearError(passwordError);
        }

        return isValid;
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!validateForm()) {
            showFeedback('Please fix the errors before signing in.', true);
            return;
        }

        const formData = {
            email: emailInput.value.trim(),
            password: passwordInput.value,
            rememberMe: rememberCheckbox.checked,
        };

        console.log('Login form submitted:', formData);
        showFeedback('Welcome back! You have successfully signed in.');
        loginForm.reset();
    });

    emailInput.addEventListener('input', () => {
        clearError(emailError);
        clearFeedback();
    });

    passwordInput.addEventListener('input', () => {
        clearError(passwordError);
        clearFeedback();
    });

    togglePasswordButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordButton.textContent = type === 'password' ? 'Show' : 'Hide';
    });

    loginForm.addEventListener('reset', () => {
        clearError(emailError);
        clearError(passwordError);
        clearFeedback();
    });
});