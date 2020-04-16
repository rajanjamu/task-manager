const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

// User Samples
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: 'mike@123',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, 'thisismynewcourse')
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Duke',
    email: 'duke@example.com',
    password: 'duke@123',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, 'thisismynewcourse')
    }]
}

// Task Samples
const taskOne = {
    _id: mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: false,
    owner: userOne._id
}

const taskThree = {
    _id: mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: false,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    taskThree,
    setupDatabase
}