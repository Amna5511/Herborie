import axios from 'axios'

const plantService = {
  getAll: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plants`)
    return response.data
  },

  getOne: async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plants/${id}`)
    return response.data
  }
}

export default plantService