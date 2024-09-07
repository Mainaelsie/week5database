const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Computer_science@321'
});

const week5 = 'CREATE DATABASE IF NOT EXISTS week5';

const createTableUsers = `
CREATE TABLE IF NOT EXISTS week5.users {
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
};
`
const createExpensesTable = `
CREATE TABLE IF NOT EXISTS week5.Expenses(
    expense_id INT AUTO_INCREMENT PRIMARY_KEY,
    user_id INT,
    category_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    date DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`
const createCategoriesTable = `
CREATE TABLE IF NOT EXISTS week5.Categories(
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category_name VARCHAR(100) NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`
const createPaymentsTable = `
CREATE TABLE IF NOT EXISTS week5.Payments(
    payment_method_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    payment_method_name VARCHAR(100) NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`
const createBudgetTable = `
CREATE TABLE IF NOT EXISTS week5.Budget(
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`

// connection.query(week5, function(err, results) {
//     if (err) {
//         console.log(err.message);
//     }
//     console.log('week5 database created');
// });

connection.connect(function(err) {
    if (err) {
        console.log(err.message);
    }
    console.log('Connected to database');
    connection.query(createTableUsers, function(err, results){
        if (err) {
            console.log(err.message);
        }
        console.log('users table created');
    connection.query(createExpensesTable, function(err, results){
        if (err) {
            console.log(err.message);
        }
        console.log('expenses table created');
    
        connection.query(createCategoriesTable, function(err, results){
            if(err) {
                console.log(err.message);
            }
            console.log('categories table created');
        
            connection.query(createPaymentsTable, function(err, results){
                if(err) {
                    console.log(err.message);
                }
                console.log('payments table created');
                    connection.query(createBudgetTable, function(err, results){
                        if(err) {
                            console.log(err.message);
                        }
                        console.log('budget table created');
    
                    connection.end();
                    })
                })
            })
        })
    })
});

