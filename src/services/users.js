import axios from 'axios'
const baseUrl = '/api/users'


const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createUser = async newObject => {
  const response = await axios.post(baseUrl, newObject )
  return response.data
}


export default { getUsers, createUser }