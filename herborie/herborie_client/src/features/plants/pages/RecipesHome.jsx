import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { recipesAtom } from '../atoms/recipe.atom'
import recipeService from '../services/recipe.service'
import plantService from '../services/plant.service'  
import { RecipeCard } from '../components/RecipeCard'

export const RecipesHome = () => {
  const [recipes, setRecipes] = useAtom(recipesAtom)
  const [plants, setPlants] = useState([])
  const [selectedPlant, setSelectedPlant] = useState('')

  //charges plants
  useEffect(() => {
    plantService.getAll().then(setPlants).catch(console.error)
  }, [])

  //charges recipes
  useEffect(() => {
    if (selectedPlant) {
      recipeService.getByPlant(selectedPlant).then(setRecipes).catch(console.error)
    } else {
      recipeService.getAll().then(setRecipes).catch(console.error)
    }
  }, [selectedPlant])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <div className="mb-12">
        <p className="font-body text-xs uppercase tracking-widest text-muted mb-3">
          King's American Dispensatory, 1898
        </p>
        <h1 className="font-display text-5xl text-ink leading-tight">Remedies & Recipes</h1>
        <div className="h-px bg-muted/30 mt-8" />
      </div>

      {/* Filter by plant */}
      <div className="mb-8">
        <select
          value={selectedPlant}
          onChange={(e) => setSelectedPlant(e.target.value)}
          className="font-body text-sm border border-muted/40 rounded px-4 py-2 bg-transparent text-ink"
        >
          <option value="">All plants</option>
          {plants.map(plant => (
            <option key={plant._id} value={plant._id}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>

      {recipes.length === 0 ? (
        <p className="font-body italic text-muted">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}

    </div>
  )
}