import { Link } from "react-router"

export const HeroSection = () => {
  return (
    <section className="border-b border-muted/30 py-28 px-6 text-center">
      <p className="font-body text-xs uppercase tracking-[0.4em] text-muted mb-8">
        A Botanical Garden
      </p>
      <h1 className="font-display text-8xl text-ink leading-none mb-6">Herborie</h1>
      <div className="flex items-center justify-center gap-6 my-6">
        <div className="h-px w-32 bg-muted/40" />
        <span className="text-sage text-xl">✦</span>
        <div className="h-px w-32 bg-muted/40" />
      </div>
      <p className="font-body text-muted italic max-w-sm mx-auto text-lg leading-relaxed">
        Medicinal plants, their virtues and cautions, gathered from traditions across the world.
      </p>
      <Link to="/plants" className="btn inline-block mt-12">
        Explore the Collection
      </Link>
    </section>
  )
}