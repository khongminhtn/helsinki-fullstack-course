describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    // Add a user to database using REST API
    const user = {
      name: 'Tuyen Khong',
      username: 'tuyenkhong',
      password: 'tuyenkhong12'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login-username').type('tuyenkhong')
      cy.get('#login-password').type('tuyenkhong12')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login-username').type('zoekhong')
      cy.get('#login-password').type('zoekhong12')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#login-username').type('tuyenkhong')
      cy.get('#login-password').type('tuyenkhong12')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#togglable-on').click()
      cy.get('#title').type('Bitcoin')
      cy.get('#author').type('tuyen khong')
      cy.get('#url').type('www.tkbitcoin.com')
      cy.get('#blog-create-button').click()
      cy.visit('http://localhost:3001')
      cy.contains('Bitcoin')
    })

    it('Users can create a blog and like a blog', function() {
      cy.get('#togglable-on').click()
      cy.get('#title').type('Bitcoin')
      cy.get('#author').type('tuyen khong')
      cy.get('#url').type('www.tkbitcoin.com')
      cy.get('#blog-create-button').click()
      cy.visit('http://localhost:3001')
      cy.contains('Bitcoin')

      cy.get('#blog-view-button').click()
      cy.contains('0')
      cy.get('#blog-like-button').click()
      cy.contains('1')
    })

    it('Users who created a blog, can delete a blog', function() {
      cy.get('#togglable-on').click()
      cy.get('#title').type('Bitcoin')
      cy.get('#author').type('tuyen khong')
      cy.get('#url').type('www.tkbitcoin.com')
      cy.get('#blog-create-button').click()
      cy.visit('http://localhost:3001')
      cy.contains('Bitcoin')

      cy.get('#blog-view-button').click()
      cy.get('#blog-remove-button').click()
      cy.on('window:confirm', () => true)
      cy.visit('http://localhost:3001')
      cy.get('html').should('not.contain', 'Bitcoin')
    })
  })

  describe('When logged in and have multiple blogs in database', function() {
    beforeEach(function() {
      // Loggin
      cy.login({ username: 'tuyenkhong', password: 'tuyenkhong12' })

      // Create Blog
      cy.createBlog({
        title: 'Bitcoin1',
        author: 'Tuyen Khong',
        url: 'www.tuyenkhong.com',
        likes: 0
      })
      cy.createBlog({
        title: 'Bitcoin2',
        author: 'Tuyen Khong',
        url: 'www.tuyenkhong.com',
        likes: 1
      })
      cy.createBlog({
        title: 'Bitcoin3',
        author: 'Tuyen Khong',
        url: 'www.tuyenkhong.com',
        likes: 2
      })
      cy.createBlog({
        title: 'Bitcoin4',
        author: 'Tuyen Khong',
        url: 'www.tuyenkhong.com',
        likes: 3
      })
    })

    it('Blogs are ordered according to number likes, highest likes being first', function() {
      // If map() is used, jQuery map is used instead
      // (index, element) => {...} rather than (element, index) => {...}

      // Searches the first blog and check whether it has the highest likes
      cy.contains('Bitcoin').contains('view').click()
      cy.contains('3')

      // Add more likes to other blogs with lower likes
      cy.contains('Bitcoin1').contains('view').click()
      cy.contains('Bitcoin1').contains('like').click().click().click().click().click()

      // Checks that the first blog is Bitcoin1 with most like after refreshing the page
      cy.visit('http://localhost:3001/')
      cy.contains('Bitcoin').contains('view').click()
      cy.contains('Bitcoin').contains('5')
      cy.contains('Bitcoin1').contains('5')
    })
  })
})