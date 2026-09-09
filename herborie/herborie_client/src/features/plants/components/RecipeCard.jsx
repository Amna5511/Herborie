import { useAtom } from 'jotai'
import { shoppingListAtom } from '../atoms/recipe.atom'

const parseIngredients = (content) => {
  const lines = content.split('\n')
  const found = lines
    .filter(line => /^\d|^[-•]/.test(line.trim()))
    .map(line => line.trim().replace(/^[-•]\s*/, ''))
  return found
}

export const RecipeCard = ({ recipe }) => {
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom)

  const ingredients = parseIngredients(recipe.content)
  const alreadyAdded = shoppingList.some(i => i.recipeTitle === recipe.title)

  const addToList = () => {
    if (alreadyAdded) return

    const toAdd = ingredients.length > 0
      ? ingredients.map((raw, i) => ({
          id: `${recipe._id}-${i}-${Date.now()}`,
          name: raw,
          plantName: recipe.plant?.name ?? '',
          recipeTitle: recipe.title,
          checked: false,
        }))
      : [{
          id: `${recipe._id}-0-${Date.now()}`,
          name: `Ingredients for: ${recipe.title}`,
          plantName: recipe.plant?.name ?? '',
          recipeTitle: recipe.title,
          checked: false,
        }]

    const existing = new Set(shoppingList.map(i => i.recipeTitle + i.name))
    const fresh = toAdd.filter(i => !existing.has(i.recipeTitle + i.name))
    if (fresh.length > 0) setShoppingList(prev => [...prev, ...fresh])
  }

  return (
    <div className="border border-muted/30 bg-cream hover:border-sage transition-colors">
      
      {/* Image ou placeholder */}
      {recipe.image ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full  h-64 object-contain border-b border-muted/30"
        />
      ) : (
        <div className="w-full aspect-video bg-cream border-b border-muted/30 flex items-center justify-center">
          <span className="font-display text-7xl text-muted/20">✦</span>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="font-display text-xl text-ink leading-snug">{recipe.title}</h3>
          <button
            onClick={addToList}
            disabled={alreadyAdded}
            className={`font-body text-xs uppercase tracking-widest px-3 py-1.5 border transition-colors flex-shrink-0 ${
              alreadyAdded
                ? 'text-muted border-muted/20 cursor-default'
                : 'text-sage border-sage/30 hover:bg-sage hover:text-cream'
            }`}
          >
            {alreadyAdded ? '✓ Added' : '+ List'}
          </button>
        </div>

        <div className="h-px bg-muted/20 mb-4" />

        <p className="font-body text-sm text-ink/80 leading-relaxed whitespace-pre-line">
          {recipe.content}
        </p>

        {recipe.plant?.name && (
          <p className="font-body text-xs uppercase tracking-widest text-muted mt-5">
            Plant — {recipe.plant.name}
          </p>
        )}
      </div>
    </div>
  )
}