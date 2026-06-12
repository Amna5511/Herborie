import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { recipesAtom } from '../atoms/recipe.atom'
import recipeService from '../services/recipe.service'
import { RecipeCard } from '../components/RecipeCard'

export const RecipesHome = () => {
  const [recipes, setRecipes] = useAtom(recipesAtom)

  useEffect(() => {
    recipeService.getAll().then(setRecipes).catch(console.error)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <div className="mb-12">
        <p className="font-body text-xs uppercase tracking-widest text-muted mb-3">
          King's American Dispensatory, 1898
        </p>
        <h1 className="font-display text-5xl text-ink leading-tight">Remedies & Recipes</h1>
        <div className="h-px bg-muted/30 mt-8" />
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