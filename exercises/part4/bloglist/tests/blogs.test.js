const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')


// testing front end api
test('ammount of blog posts', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body.length).toEqual(24)
})

test('content to be in json format', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
})

test('unique identifier named id', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)

  expect(res.body[0]["id"]).toBeDefined()
})

describe('when creating blog post require authentication', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password',10)
    const user = new User({ 
      username: 'zoekhong', 
      name: 'Zoe Khong', 
      passwordHash
    })

    await user.save()
  })

  test('create new blog post', async () => {
    // Login
    const user = {
      username: 'zoekhong',
      password: 'password'
    }
  
    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)
  
    const token = `bearer ${loginResponse.body.token}`
  
    // Request
    const newBlog = {
      title: "New Blog: Pandora",
      Author: "Tyler Marsh",
      url: "www.tylermarsh.co.staines",
      like: 23982893
    } 
  
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: token })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  
  test('missing likes property, set to default 0', async () => {
    // Login
    const user = {
      username: 'zoekhong',
      password: 'password'
    }
  
    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)
  
    const token = `bearer ${loginResponse.body.token}`
  
    // Request
    const newBlog = {
      title: "New Blog: Pandora",
      Author: "Tyler Marsh",
      url: "www.tylermarsh.co.staines",
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: token })
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })
  
  test('missing url & title', async () => {
    // Login
    const user = {
      username: 'zoekhong',
      password: 'password'
    }
  
    const loginResponse = await api
      .post('/api/login')
      .send(user)
      .expect(200)
  
    const token = `bearer ${loginResponse.body.token}`
  
    // Request
    const newBlog = {
      Author: "Tyler Marsh",
      likes: 0
    }
    
    if (newBlog.url === undefined && newBlog.title === undefined) {
      await api
        .post('/api/blogs')
        .set({Authorization: token})
        .expect(400)
    }
  })
})


// afterAll() once all tests done, close mongoose connections
afterAll(async () => {
  await mongoose.connection.close()
})