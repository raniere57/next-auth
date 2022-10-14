import { createContext } from 'react'

interface IAuthContextData {
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }) {

  const isAuthenticated = false

  async function signIn() {

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}