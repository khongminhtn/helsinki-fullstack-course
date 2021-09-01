const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

////////// CONTROLLERS /////////
blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogRouter.post('', async (request, response, next) => {
  try {
    const body = request.body

    if (!request.token || !request.user.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
  
    const user = await User.findById(request.user.id)
  
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      userId: user.id
    })
  
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
  
    response.status(201).json(savedBlog)
    
  } catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const requestBlogId = request.params.id
  
    // Verify that user is the creator of blog
    const blog = await Blog.findById(requestBlogId)

    blog.userId.toString() === request.user.id
      ? await Blog.findByIdAndRemove(requestBlogId)
      : response.status(401).json({ error: 'You are not authorized to delete this blog.' })

    return response.status(204).json({ message: 'Successfully deleted'})
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