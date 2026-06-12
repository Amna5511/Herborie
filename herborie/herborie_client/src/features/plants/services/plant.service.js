import axios from 'axios'

const plantService = {
  getAll: async () => {
    const response = await axios.get('http://localhost:3000/api/plants')
    return response.data
  },

  getOne: async (id) => {
    const response = await axios.get(`http://localhost:3000/api/plants/${id}`)
    return response.data
  }
}

export default plantService