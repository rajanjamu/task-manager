const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

// SIGNUP
test('Should signup a new user', async () =>{
    const response = await request(app)
    .post('/users')
    .send({
        name: 'Test',
        email: 'test@gmail.com',
        password: 'test@123'
    }).expect(201)

    // Assert that the databse was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Test',
            email: 'test@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('test@123')
})

// LOGIN SUCCESS
test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

// LOGIN FAILURE
test('Should not login non-existent user', async () => {
    await request(app).post('/users/login').send({
        email: 'non@existent.com',
        password: 'nonexistent@123'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send()
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            name: 'Update',
        }).expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Update')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            location: 'Sikar'
        }).expect(400)
})

test('Should not update with unauthenticated user', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'Update',
            age: 99
        }).expect(401)
    
    const user = await User.findById(userOneId)
    expect(user).toMatchObject({
        name: 'Mike',
        age: 0
    })
})

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated