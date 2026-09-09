import { useState } from 'react'
import { useNavigate } from 'react-router'
import authService from '../services/auth.service'



export const RegisterForm = () => {
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value }) 
  const handleSubmit = async (e) => {
    
    e.preventDefault()
    setError(null)
    try {
      await authService.register(form)
      navigate('/auth/login')
    } catch {
      setError('Registration failed.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md">
      {[
        { label: 'First Name', name: 'firstname' },
        { label: 'Last Name',  name: 'lastname' },
        { label: 'Email',      name: 'email',    type: 'email' },
        { label: 'Password',   name: 'password', type: 'password' },
      ].map(({ label, name, type = 'text' }) => (
        <div key={name}>
          <label className="label-form">{label}</label>
          <input name={name} type={type} value={form[name]} onChange={handleChange} className="input-form" />
        </div>
      ))}
      {error && <p className="font-body text-rust text-sm">{error}</p>}
      <button type="submit" className="btn">Create Account</button>
    </form>
  )
}