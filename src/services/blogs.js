import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
  return token
}

const destroyToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log(newObject)
  const response = await axios.post(baseUrl, newObject, getConfig())
  console.log(response)
  console.log(response.data)
  
  return response.data
}

const update = async newObject => {
  console.log(`${baseUrl}/${newObject.id}`)
  console.log(newObject + 'newObject ')
  console.log(getConfig())
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, getConfig())
  console.log(response.body)
  console.log(response)
  return response.body
}

const remove = async object => {
  const response = await axios.delete(`${baseUrl}/${object.id}`, getConfig())
  return response.data
}

const getComments = async object => {
  console.log(object + 'object')
  const response = await axios.get(`${baseUrl}/${object}/comments`)
  console.log(response.data)
  return response.data
}

const createNewComment = async newObject => {
  console.log(newObject + 'newObject')
  const response = await axios.post(`${baseUrl}/${newObject.blog}/comments`, newObject)
  return response.data
}

export default { getAll, create, update, remove, setToken, destroyToken, createNewComment, getComments }