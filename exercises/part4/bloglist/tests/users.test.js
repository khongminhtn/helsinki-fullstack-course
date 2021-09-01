const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

describe('when only 1 user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('firstpass', 10)
    const user = new User({username: 'root', name:'root2', passwordHash})

    await user.save()
  })

  test('successfully post a user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'khongminhtn',
      name: 'Tuyen Khong',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('unsuccessfully posting a user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Tuyen Khong',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password shorter than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testing',
      name: 'Tuyen Khong',
      password: 'pa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('Password need to have 3 or more characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})