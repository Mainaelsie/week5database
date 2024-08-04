const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());

let expenses = [];

const users = [
  {
    username: 'user1',
    password: '$2b$10$wZFEcOphl8K./Pa/JuFJ2ufFbTfIufIzWuGFXcJ7jSPCl6Yk.k8W6' // hashed password for 'password123'
  }
];

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const expense = req.body;
  expense.id = expenses.length + 1;
  expenses.push(expense);
  res.status(201).json(expense);
});

app.put('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const expenseIndex = expenses.findIndex(e => e.id === id);

  if (expenseIndex !== -1) {
    expenses[expenseIndex] = { ...expenses[expenseIndex], ...req.body };
    res.json(expenses[expenseIndex]);
  } else {
    res.status(404).send('Expense not found');
  }
});

app.delete('/api/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const expenseIndex = expenses.findIndex(e => e.id === id);

  if (expenseIndex !== -1) {
    const deletedExpense = expenses.splice(expenseIndex, 1);
    res.json(deletedExpense);
  } else {
    res.status(404).send('Expense not found');
  }
});

app.get('/api/expense', (req, res) => {
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
  res.json({ totalExpense });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
