import axios from 'axios'

const authService = {
  register: async (userData) => {
    const response = await axios.post('http://localhost:3000/api/auth/register', userData)
    return response.data
  },

  login: async (data) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', data)
    localStorage.setItem('token', response.data.token)
    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
  }
}

export default authService