require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

const _id = '5e949e0e14ce6120947217eb'

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age })
//     const count = await User.countDocuments({ age })

//     return count
// }

// updateAgeAndCount(_id, 2).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount(_id).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})


// Task.findByIdAndDelete(_id).then((task) => {
//     console.log(task)

//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

// const updateAgeAndCount = async (_id) => {
//     const task = await Task.findByIdAndDelete(_id)
//     const count = await Task.countDocuments({ completed: false })
// }

// taskDeleteAndCount.then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

// Task.findOne({ _id }).then((result) => {
//     console.log(result)
//     return Task.deleteOne({ result })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })