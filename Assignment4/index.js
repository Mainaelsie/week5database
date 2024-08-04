const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock user data
const users = [
  { id: 1, username: 'john', password: bcrypt.hashSync('password', 10) },
  { id: 2, username: 'jane', password: bcrypt.hashSync('password', 10) }
];

// Mock expense data
const expenses = [
  { id: 1, userId: 1, amount: 10.99, description: 'Lunch' },
  { id: 2, userId: 1, amount: 5.99, description: 'Coffee' },
  { id: 3, userId: 2, amount: 20.99, description: 'Dinner' }
];

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
});

// User authentication API endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
  res.send({ token });
});

// Expense management API endpoints
app.get('/api/expenses', (req, res) => {
  const userId = req.user.userId;
  const userExpenses = expenses.filter((expense) => expense.userId === userId);
  res.send(userExpenses);
});

app.post('/api/expenses', (req, res) => {
  const { amount, description } = req.body;
  const userId = req.user.userId;
  const expense = { id: expenses.length + 1, userId, amount, description };
  expenses.push(expense);
  res.send(expense);
});

app.put('/api/expenses/:id', (req, res) => {
  const id = req.params.id;
  const { amount, description } = req.body;
  const userId = req.user.userId;
  const expense = expenses.find((expense) => expense.id === parseInt(id));
  if (!expense || expense.userId !== userId) {
    return res.status(404).send({ message: 'Expense not found' });
  }
  expense.amount = amount;
  expense.description = description;
  res.send(expense);
});

app.delete('/api/expenses/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;
  const expense = expenses.find((expense) => expense.id === parseInt(id));
  if (!expense || expense.userId !== userId) {
    return res.status(404).send({ message: 'Expense not found' });
  }
  expenses.splice(expenses.indexOf(expense), 1);
  res.send({ message: 'Expense deleted' });
});

// Expense calculation API endpoint
app.get('/api/expense', (req, res) => {
  const userId = req.user.userId;
  const userExpenses = expenses.filter((expense) => expense.userId === userId);
  const totalExpense = userExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  res.send({ totalExpense });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});