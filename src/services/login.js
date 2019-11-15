import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log(response + 'response')
  console.log(response.data + 'response')
  return response.data
}

export default { login }