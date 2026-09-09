import axios from 'axios'

const recipeService = {
  
   getAll: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes`)
    return response.data
  },
  getByPlant: async (plantId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes/plant/${plantId}`)
    return response.data
  },
  getOne: async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}0/api/recipes/${id}`)
    return response.data
  }
}

export default recipeService