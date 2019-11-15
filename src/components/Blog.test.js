import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import SimpleBlog from './SimpleBlog'
import ToggleBlog from'./ToggleBlog'



test('renders content', () => {
  const blog = {
    author: 'Esko Valtaoja',
    title: 'ilmastonmuutoksen maksumiehet',
    likes: '300'
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'ilmastonmuutoksen maksumiehet'
  )
  expect(component.container).toHaveTextContent(
    'Esko Valtaoja'
  )
  expect(component.container).toHaveTextContent(
    'blog has 300 likes'
  )

})

test('clicking the button calls event handler once', async () => {
  const blog = {
    author: 'Esko Valtaoja',
    title: 'ilmastonmuutoksen maksumiehet',
    likes: '300'
  }

  const mockHandler = jest.fn()
  console.log(mockHandler + 'mockhandler')
  const { getByText } = render(
    <SimpleBlog blog={blog} addingNewTestLike={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(1)
})

test('renders content', () => {
  const blog = {
    author: 'Esko Valtaoja',
    title: 'ilmastonmuutoksen maksumiehet',
    likes: '300',
    url: 'seura.fi/eskovaltaoja',
    id: '3',
    blogUser: 'Matuliini'
  }
  const user = {
    username: 'Matuliini',
    name: 'Matleena Masalin',
    id: '5d8125685b8e56e0cc0a2142'
  }

  const component = render(
    <div>
      <div  key={blog.id}>
        <ToggleBlog title={blog.title} author={blog.author} >
          <Blog
            key={blog.id}
            blog={blog}
            blogUser={blog.blogUser}
            user={user}
          />
        </ToggleBlog>
      </div>

    </div>
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'ilmastonmuutoksen maksumiehet'
  )
  expect(component.container).toHaveTextContent(
    'Esko Valtaoja'
  )
  expect(component.container).toHaveTextContent(
    '300 likes'
  )
  expect(component.container).toHaveTextContent(
    'delete'
  )
})

test('renders content', () => {
  const blog = {
    author: 'Esko Valtaoja',
    title: 'ilmastonmuutoksen maksumiehet',
    likes: '300',
    url: 'seura.fi/eskovaltaoja',
    id: '3',
    blogUser: 'Matuliini'
  }

  const component = render(
    <div>
      <div  key={blog.id}>
        <ToggleBlog title={blog.title} author={blog.author} >
          <Blog
            key={blog.id}
            blog={blog}
            blogUser={blog.blogUser}
          />
        </ToggleBlog>
      </div>

    </div>
  )
  component.debug()

  expect(component.container).toHaveTextContent(
    'ilmastonmuutoksen maksumiehet'
  )
  expect(component.container).toHaveTextContent(
    'Esko Valtaoja'
  )
  expect(component.container).toHaveTextContent(
    '300 likes'
  )
  expect(component.container).toHaveTextContent(
    '300 likes'
  )


})

