import { RegisterForm } from './components/RegisterForm'
import { Link } from 'react-router'

export const Register = () => {
  return (
    <>
      <section className="py-12 px-12 flex flex-col gap-2">
        <h1 className="font-display text-5xl text-ink">Create Account</h1>
        <p className="font-body italic text-muted">Join the community.</p>
      </section>
      <section className="flex justify-center px-12 pb-16">
        <div className="w-full max-w-md">
          <RegisterForm />
          <p className="font-body text-sm text-muted mt-6">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-sage underline">Sign in</Link>
          </p>
        </div>
      </section>
    </>
  )
}