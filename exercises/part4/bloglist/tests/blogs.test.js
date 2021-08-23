const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const mongoose = require('mongoose')
const Blogs = require('../models/blogs.js')

// testing front end api
test('ammount of blog posts', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body.length).toEqual(2)
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

  console.log(res.body)
  expect(res.body[0]["id"]).toBeDefined()
})

test('create new blog post', async () => {
  const newBlog = {
    title: "New Blog: Pandora",
    Author: "Tyler Marsh",
    url: "www.tylermarsh.co.staines",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('missing likes property', async () => {
  const newBlog = {
    title: "New Blog: Pandora",
    Author: "Tyler Marsh",
    url: "www.tylermarsh.co.staines",
    likes: 0
  }
  
  if (newBlog['likes'] === undefined) {
    newBlog['likes'] = 0
  }
  expect(newBlog['likes']).toBeDefined()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('missing url & title', async () => {
  const newBlog = {
    Author: "Tyler Marsh",
    likes: 0
  }
  
  if (newBlog['url'] === undefined && newBlog['title'] === undefined) {
    await api
      .response.status(404)
      .expect(404)
  }

})


// afterAll() once all tests done, close mongoose connections
afterAll(() => {
  mongoose.connection.close()
})