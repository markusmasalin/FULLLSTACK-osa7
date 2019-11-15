import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')

import App from './App'


describe('<App />', () => {
  test('renders all blogs it gets from backend', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    
    const component = render(
      <App />
    )

    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    component.debug()
    const blogs = component.container.querySelectorAll('.blog')


    expect(component.container).toHaveTextContent(
      'Sepultura'
    )
    expect(component.container).toHaveTextContent(
      'Footballer'
    )
    expect(component.container).toHaveTextContent(
      'Matuliini'
    )
  })
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    expect(component.lenght).toBe(undefined)

  })
})