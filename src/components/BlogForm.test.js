import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const Wrapper = (props) => {

  const onAuthor = (event) => {
    props.state.author = event.target.value
  }
  const onTitle = (event) => {
    props.state.title = event.target.value
  }
  const onUrl = (event) => {
    props.state.url = event.target.value
  }

  return (
    <BlogForm
      newAuthor={props.state.author}
      onSubmit={props.onSubmit}
      handleAuthorChange={onAuthor}
      newTitle={props.state.title}
      handleTitleChange={onTitle}
      newUrl={props.state.url}
      handleUrlChange={onUrl}
    />
  )
}

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const onSubmit = jest.fn()
  const state = {
    value: ''
  }

  const component = render(
    <Wrapper onSubmit={onSubmit} state={state} />
  )

  const authorInput = component.container.querySelector('.authorInput')
  const titleInput = component.container.querySelector('.titleInput')
  const urlInput = component.container.querySelector('.urlInput')
  const form = component.container.querySelector('form')

  fireEvent.change(authorInput, { target: { value: 'Esko Valtaoja' } })
  fireEvent.change(titleInput, { target: { value: 'ilmastonmuutoksen maksumiehet' } })
  fireEvent.change(urlInput, { target: { value: 'www.seura.fi' } })
  fireEvent.submit(form)
  console.log(state + 'state' + form + 'form')
  expect(onSubmit.mock.calls.length).toBe(1)
  expect(state.author).toBe('Esko Valtaoja')
  expect(state.title).toBe('ilmastonmuutoksen maksumiehet')
  expect(state.url).toBe('www.seura.fi')
})