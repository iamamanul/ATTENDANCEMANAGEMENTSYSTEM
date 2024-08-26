// script.js

// Load stored attendance records on page load
document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("authenticated") === "true") {
        showMainPage();
    } else {
        showLoginPage();
    }
    loadAttendanceRecords();
});

// Show login page
function showLoginPage() {
    document.getElementById('loginPage').style.display = "block";
    document.getElementById('mainPage').style.display = "none";
    document.getElementById('loginError').style.display = "none"; // Hide error message
}

// Show main page content
function showMainPage() {
    document.getElementById('loginPage').style.display = "none";
    document.getElementById('mainPage').style.display = "block";
}

// Save attendance record to localStorage
function saveAttendanceRecord(name, date, timeIn, timeOut, status) {
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const record = { name, date, timeIn, timeOut, status };
    records.push(record);
    localStorage.setItem('attendanceRecords', JSON.stringify(records));
}

// Load attendance records from localStorage and display in the table
function loadAttendanceRecords() {
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const table = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];

    records.forEach(record => {
        const newRow = table.insertRow();
        newRow.insertCell(0).innerHTML = record.name;
        newRow.insertCell(1).innerHTML = record.date;
        newRow.insertCell(2).innerHTML = record.timeIn || 'N/A';
        newRow.insertCell(3).innerHTML = record.timeOut || 'N/A';
        newRow.insertCell(4).innerHTML = record.status;
    });
}

// Attendance form event listener
document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const timeIn = document.getElementById('timeIn').value || 'N/A';
    const timeOut = document.getElementById('timeOut').value || 'N/A';
    const status = document.getElementById('status').value;

    // Save the record to localStorage
    saveAttendanceRecord(name, date, timeIn, timeOut, status);

    // Add the new record to the table
    const table = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = date;
    newRow.insertCell(2).innerHTML = timeIn;
    newRow.insertCell(3).innerHTML = timeOut;
    newRow.insertCell(4).innerHTML = status;

    // Clear form fields
    document.getElementById('attendanceForm').reset();
});

// Simple hardcoded credentials
const credentials = {
    username: "admin",
    password: "pass123"
};

// Login form event listener
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get login form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check credentials
    if (username === credentials.username && password === credentials.password) {
        alert("Login successful!");
        sessionStorage.setItem("authenticated", "true");
        showMainPage();
    } else {
        document.getElementById('loginError').style.display = "block"; // Show error message
    }
});

// Logout event listener
document.getElementById('logoutButton').addEventListener('click', function() {
    sessionStorage.removeItem('authenticated');
    showLoginPage();
});
