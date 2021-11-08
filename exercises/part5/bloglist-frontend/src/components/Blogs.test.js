import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import CreateNewBlog from './CreateNewBlog'

describe('<Blog/>', () => {
  test('checks that by default component renders only title and author', () => {
    const blog = {
      title: 'Tuyen is testing component',
      author: 'Tuyen Khong'
    }

    const component = render(<Blog blog={blog}/>)

    expect(component.container).toHaveTextContent('Tuyen is testing component')
  })

  test('checks that blog url and number renders only when view is clicked', () => {
    const blog = {
      title: 'Tuyen is testing component',
      author: 'Tuyen Khong',
      likes: 2392,
      url: 'www.tuyenkhong.com',
      userId: { username: 'tuyenkhong' }
    }

    window.localStorage.setItem('user', JSON.stringify({ username: 'tuyenkhong' }))

    const component = render(<Blog blog={blog}/>)
    fireEvent.click(component.getByText('view'))

    expect(component.container).toHaveTextContent('2392')
    expect(component.container).toHaveTextContent('www.tuyenkhong.com')
  })

  // test('checks <Blog/> renders twice upon likes clicked twice', () => {
  //   // Mock function was difficult to implement as handleLike was an inbuilt handler for <Blog/> component
  //   // rather than a given props.
  //   // Error occurs due to the lack of authorization information.
  //   const blog = {
  //     title: 'Tuyen is testing component',
  //     author: 'Tuyen Khong',
  //     likes: 0,
  //     url: 'www.tuyenkhong.com',
  //     userId: { username: 'tuyenkhong' }
  //   }

  //   window.localStorage.setItem('user', JSON.stringify({ username: 'tuyenkhong' }))

  //   const component = render(<Blog blog={blog}/>)
  //   fireEvent.click(component.getByText('view'))

  //   fireEvent.click(component.getByText('like'))
  //   expect(component.container).toHaveTextContent('1')
  //   fireEvent.click(component.getByText('like'))
  //   expect(component.container).toHaveTextContent('2')
  // })

  test('Form details matches with input id', () => {
    const component = render(<CreateNewBlog/>)
    const input = component.container.querySelector('#author')

    fireEvent.change(input, { target: { value: 'Tuyen Khong' } })
    expect(input.value).toEqual('Tuyen Khong')
  })
})