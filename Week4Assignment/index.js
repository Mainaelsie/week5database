import express from 'express'

// import { json } from 'body-parser'

const app = express()
const port = 3001

let Users =[
    {
        id: 1,
        name: 'Nally Pie',
        email: 'nallypie@gmail.com',
        password: 'password@123'
    },
    {
        id: 2,
        name: 'Soila Tee',
        email: 'soilatee@gmail.com',
        password: 'password@456' 
    }
]
app.post('/api/auth/login', ( req, res) => {
    const { name, email, password} = req.body
    const user = Users.find(user => user.email === email)
    if(user) {
        res.status(409).json({message: 'User already exists'})
    } else {
        const id = Users.length + 1
        Users.push({id, name, email, password})
        res.json({message: 'User created successfully', user: { id, name, email}})
    }
})

app.post(/api/auth/login, (res, req) => {
    const {email, password} = req.body
    const user = Users.find(user => user.email === email && user.password === password)
    if(user) {
        res.json({message: 'Login Successful', user})
    } else {
        res.status(401).json({message: 'Login failed'})
    }
})

const validateExpenseInput = [
    body('name').isString().notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).trim().escape(),
]

let mockdata = ['Food', 'Entertainment']

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.get('/api/expenses', (req, res) =>{
    res.statusCode(201).send(mockdata)
})

//Adding a new expense
app.post('/api/expenses', (req, res) => {
    const newExpense = req.body = "Groceries"
  
    mockdata.push(newExpense)
    res.send(mockdata)
})

app.put('/api/expenses/:id', (req, res) => {
    const id = req.params.id
    const updateExpense = req.body
    mockdata[id] = updateExpense
    res.send(mockdata)
})

app.delete('/api/expenses/:id', (req, res) => {
    const id = req.params.id
    mockdata.splice(id, 1)
    res.send(mockdata)
})
app.get('/api/expense', (res, req) => {
    const totalExpense = mockdata.reduse((total, expense) => {
        total + expense.amount, 0
    })
    res.json({total: totalExpense})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
