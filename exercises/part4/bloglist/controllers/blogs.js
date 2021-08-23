const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const res = await Blog.findByIdAndUpdate(request.params.id, request.body, {new:true})
    response.json(res)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter