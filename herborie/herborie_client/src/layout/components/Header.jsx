import { NavLink } from 'react-router'
import { useAtom } from 'jotai'
import { isConnectAtom, tokenAtom } from '../../features/auth/atoms/auth.atom'
import { shoppingCountAtom } from '../../features/plants/atoms/recipe.atom'
import authService from '../../features/auth/services/auth.service'

export const Header = () => {
  const [isConnect] = useAtom(isConnectAtom)
  const [, setToken] = useAtom(tokenAtom)
  const [count] = useAtom(shoppingCountAtom)

  const handleLogout = () => {
    authService.logout()
    setToken(null)
  }

  const navLink = "hover:text-cream transition-colors"
  const activeLink = "text-cream"
  const inactiveLink = "text-cream/60"

  return (
    <header className="bg-ink text-cream px-8 py-4 flex justify-between items-center">
      <NavLink to="/" className="font-display text-xl tracking-widest text-cream">
        Herborie
      </NavLink>
      <nav className="flex gap-8 font-body text-xs uppercase tracking-widest">
        <NavLink
          to="/plants"
          className={({ isActive }) => `${navLink} ${isActive ? activeLink : inactiveLink}`}
        >
          Collection
        </NavLink>
        {isConnect && (
          <>
            <NavLink
              to="/recipes"
              className={({ isActive }) => `${navLink} ${isActive ? activeLink : inactiveLink}`}
            >
              Recipes
            </NavLink>
            <NavLink
              to="/shopping-list"
              className={({ isActive }) => `${navLink} ${isActive ? activeLink : inactiveLink} relative`}
            >
              List
              {count > 0 && (
                <span className="ml-1.5 font-body text-xs bg-sage text-cream px-1.5 py-0.5">
                  {count}
                </span>
              )}
            </NavLink>
          </>
        )}
        {isConnect ? (
          <button
            onClick={handleLogout}
            className="text-cream/60 hover:text-cream transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        ) : (
          <NavLink
            to="/auth/login"
            className={({ isActive }) => `${navLink} ${isActive ? activeLink : inactiveLink}`}
          >
            Sign In
          </NavLink>
        )}
      </nav>
    </header>
  )
}