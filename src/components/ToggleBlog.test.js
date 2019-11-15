import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ToggleBlog from './ToggleBlog'

describe('<ToggleBlog />', () => {
  let component
  const b = {
    author: 'Esko Valtaoja',
    title: 'ilmastonmuutoksen maksumiehet',
    likes: '300',
    url: 'seura.fi/eskovaltaoja',
    id: '3',
    blogUser: 'Matuliini'
  }

  beforeEach(() => {
    component = render(
      <ToggleBlog title={b.title} author={b.author}>
        <div className="testDiv" />
      </ToggleBlog>
    )
    component.debug()
  })

  test('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the element, children are displayed', () => {
    const button = component.container.querySelector('.toggleP')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})