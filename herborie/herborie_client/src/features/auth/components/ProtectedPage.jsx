import { useAtom } from 'jotai'
import { Navigate } from 'react-router'
import { isConnectAtom } from '../atoms/auth.atom'

export const ProtectedPage = ({ children }) => {
  const [isConnect] = useAtom(isConnectAtom)

  if (!isConnect) return <Navigate to="/auth/login" />

  return children
}