import { Link } from 'react-router'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <h1 className="font-display text-6xl text-ink">404</h1>
      <p className="font-body italic text-muted">This entry does not exist.</p>
      <Link to="/" className="btn">Back to Collection</Link>
    </div>
  )
}