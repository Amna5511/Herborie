import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { useAtom } from 'jotai'
import { plantsAtom } from '../atoms/plant.atom'
import { recipesAtom } from '../atoms/recipe.atom'
import plantService from '../services/plant.service'
import recipeService from '../services/recipe.service'
import { RecipeCard } from '../components/RecipeCard'

export const PlantDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [plants, setPlants] = useAtom(plantsAtom)
  const [recipes, setRecipes] = useAtom(recipesAtom)
  const [plant, setPlant] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [recipesLoading, setRecipesLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (plants.length === 0) {
      plantService.getAll().then(setPlants).catch(console.error)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    setRecipes([])
    setRecipesLoading(true)

    plantService
      .getOne(id)
      .then(data => { setPlant(data); setLoading(false) })
      .catch(err => { setError(err); setLoading(false) })

    recipeService
      .getByPlant(id)
      .then(data => { setRecipes(data); setRecipesLoading(false) })
      .catch(() => { setRecipes([]); setRecipesLoading(false) })
  }, [id])

  const currentIndex = plants.findIndex(p => p._id === id)
  const prevPlant = currentIndex > 0 ? plants[currentIndex - 1] : null
  const nextPlant = currentIndex < plants.length - 1 ? plants[currentIndex + 1] : null

  if (isLoading) return <p className="p-12 font-body italic text-muted">Loading entry...</p>
  if (error || !plant) return <p className="p-12 font-body text-rust">Entry not found.</p>

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <div className="flex justify-between items-center mb-12">
        <Link
          to="/plants"
          className="font-body text-xs uppercase tracking-widest text-muted hover:text-sage transition-colors"
        >
          ← Back to Collection
        </Link>
        <div className="flex gap-6">
          {prevPlant && (
            <button
              onClick={() => navigate(`/plants/${prevPlant._id}`)}
              className="font-body text-xs uppercase tracking-widest text-muted hover:text-sage transition-colors"
            >
              ← {prevPlant.name}
            </button>
          )}
          {nextPlant && (
            <button
              onClick={() => navigate(`/plants/${nextPlant._id}`)}
              className="font-body text-xs uppercase tracking-widest text-muted hover:text-sage transition-colors"
            >
              {nextPlant.name} →
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        <div>
          {plant.image ? (
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full object-cover border border-muted/30"
            />
          ) : (
            <div className="w-full aspect-square bg-cream border border-muted/30 flex items-center justify-center">
              <span className="font-display text-7xl text-muted/20">✦</span>
            </div>
          )}

          <div className="flex justify-between mt-4">
            {prevPlant ? (
              <button
                onClick={() => navigate(`/plants/${prevPlant._id}`)}
                className="font-body text-xs uppercase tracking-widest text-sage border border-sage/30 px-4 py-2 hover:bg-sage hover:text-cream transition-colors"
              >
                ←
              </button>
            ) : <span />}
            {nextPlant && (
              <button
                onClick={() => navigate(`/plants/${nextPlant._id}`)}
                className="font-body text-xs uppercase tracking-widest text-sage border border-sage/30 px-4 py-2 hover:bg-sage hover:text-cream transition-colors"
              >
                →
              </button>
            )}
          </div>
        </div>

        <div>
          {plant.poisonous && (
            <span className="font-body text-xs uppercase tracking-widest text-rust border border-rust/40 px-3 py-1 mb-5 inline-block">
              ⚠ Toxic
            </span>
          )}
          <h1 className="font-display text-5xl text-ink leading-tight mt-2">{plant.name}</h1>
          <p className="font-body text-xl italic text-muted mt-2 mb-8">{plant.latin_name}</p>
          <div className="h-px bg-muted/30 mb-8" />

          <PlantSection label="Properties">
            <div className="flex flex-wrap gap-2">
              {plant.effects.map((e, i) => (
                <span key={i} className="font-body text-xs uppercase tracking-wider text-sage border border-sage/30 px-2 py-1">
                  {e}
                </span>
              ))}
            </div>
          </PlantSection>

          <PlantSection label="Parts Used">
            <p className="font-body text-ink/80">{plant.medicalpart?.join(', ')}</p>
          </PlantSection>

          <PlantSection label="Origin & Distribution">
            <p className="font-body text-ink/80">{plant.geolocalisation}</p>
          </PlantSection>

          <PlantSection label="Medical Use">
            <p className="font-body text-ink/80 leading-relaxed">{plant.medicaluse}</p>
          </PlantSection>

          {plant.warnings && (
            <div className="bg-rust/5 border border-rust/20 p-5 mt-2">
              <p className="font-body text-xs uppercase tracking-widest text-rust mb-2">⚠ Cautions</p>
              <p className="font-body text-ink/80 leading-relaxed text-sm">{plant.warnings}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-20">
        <div className="h-px bg-muted/30 mb-10" />
        <p className="font-body text-xs uppercase tracking-widest text-muted mb-8">
          Remedies & Recipes
        </p>

        {recipesLoading ? (
          <p className="font-body italic text-muted text-sm">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="font-body italic text-muted text-sm">No recipes recorded for this plant.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

const PlantSection = ({ label, children }) => (
  <div className="mb-6">
    <p className="font-body text-xs uppercase tracking-widest text-muted mb-2">{label}</p>
    {children}
  </div>
)