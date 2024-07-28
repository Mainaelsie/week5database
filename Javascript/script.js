// Declare variables of different data types
let name = "Natalie Linn"; // String
let age = 25; // Number
let isStudent = true; // Boolean

// Define and call functions to perform simple operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Function to display result in the output div
function displayResult(result) {
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = "Result: " + result;
}

// Add event listeners to buttons
document.getElementById('addBtn').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const result = add(num1, num2);
    console.log('Addition Result:', result);
    displayResult(result);
});

document.getElementById('subtractBtn').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const result = subtract(num1, num2);
    console.log('Subtraction Result:', result);
    displayResult(result);
});

document.getElementById('multiplyBtn').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const result = multiply(num1, num2);
    console.log('Multiplication Result:', result);
    displayResult(result);
});

document.getElementById('divideBtn').addEventListener('click', function() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const result = divide(num1, num2);
    console.log('Division Result:', result);
    displayResult(result);
});

// Chart.js integration
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Sample Data',
            data: [10, 5, 17, 10, 15, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
