import { Link } from 'react-router'

export const PlantCard = ({ plant }) => {
  return (
    <Link to={`/plants/${plant._id}`}>
      <div className="bg-cream border border-muted/30 p-6 hover:border-sage transition-colors h-full">
        {plant.poisonous && (
          <p className="font-body text-xs uppercase tracking-widest text-rust mb-3">⚠ Toxic</p>
        )}
        <h3 className="font-display text-xl text-ink leading-snug">{plant.name}</h3>
        <p className="font-body text-sm italic text-muted mt-1 mb-5">{plant.latin_name}</p>
        <div className="border-t border-muted/20 pt-4 flex flex-wrap gap-2">
          {plant.effects.slice(0, 3).map((e, i) => (
            <span key={i} className="font-body text-xs uppercase tracking-wider text-sage border border-sage/30 px-2 py-0.5">
              {e}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}