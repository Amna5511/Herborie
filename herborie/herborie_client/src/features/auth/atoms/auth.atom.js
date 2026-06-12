import { atom } from 'jotai'

export const tokenAtom = atom(localStorage.getItem('token'))

export const isConnectAtom = atom((get) => {
  const token = get(tokenAtom)
  return token !== null
})