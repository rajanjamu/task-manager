const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// USERS - CREATE
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// USERS - READ ALL
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// USERS - READ ONE
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('User not found!')
        }

        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// TASKS - CREATE
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

// TASKS - READ ALL
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// TASKS - READ ONE
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send('Task not found!')
        }
        
        res.status(200).send(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})