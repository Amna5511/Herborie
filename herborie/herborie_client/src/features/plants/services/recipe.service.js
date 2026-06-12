import axios from 'axios'

const recipeService = {
  
   getAll: async () => {
    const response = await axios.get('http://localhost:3000/api/recipes')
    return response.data
  },
  getByPlant: async (plantId) => {
    const response = await axios.get(`http://localhost:3000/api/recipes/plant/${plantId}`)
    return response.data
  },
  getOne: async (id) => {
    const response = await axios.get(`http://localhost:3000/api/recipes/${id}`)
    return response.data
  }
}

export default recipeService