import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { plantsAtom } from '../atoms/plant.atom'
import plantService from '../services/plant.service'
import { PlantCard } from '../components/PlantCard'

export const PlantHome = () => {
  const [plants, setPlants] = useAtom(plantsAtom)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (plants.length > 0) { setLoading(false); return }
    setLoading(true)
    setError(null)
    plantService.getAll()
      .then((data) => { setPlants(data); setLoading(false) })
      .catch((err) => { setError(err); setLoading(false) })
  }, [])

  return (
    <section id="collection" className="max-w-6xl mx-auto px-6 pb-20">
      <div className="flex items-baseline gap-4 mb-10">
        <h2 className="font-display text-3xl text-ink">The Collection</h2>
        <span className="font-body text-sm italic text-muted">{plants.length} entries</span>
      </div>
      {isLoading ? (
        <p className="font-body italic text-muted">Loading content...</p>
      ) : error ? (
        <p className="font-body text-rust">Error loading plants.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plants.map(plant => (
            <PlantCard key={plant._id} plant={plant} />
          ))}
        </div>
      )}
    </section>
  )
}