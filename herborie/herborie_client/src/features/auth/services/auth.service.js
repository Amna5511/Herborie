import axios from 'axios'

const authService = {
  register: async (userData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, userData)
    return response.data
  },

  login: async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, data)
    localStorage.setItem('token', response.data.token)
    return response.data
  },

 logout: async () => {
  const token = localStorage.getItem('token')
  await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
  localStorage.removeItem('token')
}
}

export default authService