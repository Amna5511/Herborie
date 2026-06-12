import { LoginForm } from './components/LoginForm'
import { Link } from 'react-router'

export const Login = () => {
  return (
    <>
      <section className="py-12 px-12 flex flex-col gap-2">
        <h1 className="font-display text-5xl text-ink">Sign In</h1>
        <p className="font-body italic text-muted">Access the full collection.</p>
      </section>
      <section className="flex justify-center px-12 pb-16">
        <div className="w-full max-w-md">
          <LoginForm />
          <p className="font-body text-sm text-muted mt-6">
            No account yet?{' '}
            <Link to="/auth/register" className="text-sage underline">Register here</Link>
          </p>
        </div>
      </section>
    </>
  )
}