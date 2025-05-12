const form = document.getElementById('registrationForm');
const tableBody = document.querySelector('#userTable tbody');

const emailWarning = document.getElementById('emailWarning');
const dobWarning = document.getElementById('dobWarning');
const termsWarning = document.getElementById('termsWarning');

function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function isValidEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}

function loadEntries() {
    tableBody.innerHTML = "";
    const entries = JSON.parse(localStorage.getItem('userEntries')) || [];

    entries.forEach((entry, index) => {
        const row = tableBody.insertRow();

        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.accepted}</td>
            <td><button onclick="deleteEntry(${index})">Delete</button></td>
        `;
    });
}
function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('userEntries', JSON.stringify(entries));
    loadEntries();
}
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Clear previous warnings
    emailWarning.textContent = "";
    dobWarning.textContent = "";
    termsWarning.textContent = "";

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const accepted = document.getElementById('acceptTerms').checked;

    let isValid = true;

    // Email validation
    if (!isValidEmail(email)) {
        emailWarning.textContent = " Please enter a valid email address.";
        isValid = false;
    }

    // DOB validation
    const age = calculateAge(dob);
    if (!dob || age < 18 || age > 55) {
        dobWarning.textContent = " Age must be between 18 and 55.";
        isValid = false;
    }

    // Terms checkbox validation
    if (!accepted) {
        termsWarning.textContent = " You must accept the terms.";
        isValid = false;
    }

    if (!isValid) return;

    const entry = { name, email, password, dob, accepted };

    const entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    entries.push(entry);
    localStorage.setItem('userEntries', JSON.stringify(entries));

    loadEntries();
    form.reset();
});

window.onload = loadEntries;
function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem('userEntries')) || [];
    entries.splice(index, 1); // Remove the selected entry
    localStorage.setItem('userEntries', JSON.stringify(entries));
    loadEntries();
    }
