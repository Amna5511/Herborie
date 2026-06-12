import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSetAtom } from 'jotai'
import { tokenAtom } from '../atoms/auth.atom'
import authService from '../services/auth.service'

export const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const setToken = useSetAtom(tokenAtom)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const data = await authService.login(form)
      setToken(data.token)
      navigate('/')
    } catch {
      setError('Incorrect credentials.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md">
      <div>
        <label className="label-form">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="input-form" />
      </div>
      <div>
        <label className="label-form">Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} className="input-form" />
      </div>
      {error && <p className="font-body text-rust text-sm">{error}</p>}
      <button type="submit" className="btn">Sign In</button>
    </form>
  )
}