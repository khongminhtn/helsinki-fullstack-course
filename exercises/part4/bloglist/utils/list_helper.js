const logger = require('./logger')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => likes += blog.likes)
  return likes
}

const favouriteBlog = (blogs) => {
  let highestLikes = 0
  let favourite = null
  blogs.forEach(blog => {
    if (blog.likes > highestLikes) {
      highestLikes = blog.likes
      favourite = blog
    }
  })
  return favourite
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}