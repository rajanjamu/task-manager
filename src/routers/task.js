const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

// TASKS - CREATE
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

// TASKS - READ ALL
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

// TASKS - READ ONE
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.send(404).send('Task not found!')
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// TASKS - UPDATE
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send('Task not found!')
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// TASKS - DELETE
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send({ error: 'Task not found!' })
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router