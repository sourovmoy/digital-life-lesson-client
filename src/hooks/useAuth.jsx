import { useContext } from 'react'
import { AuthContext } from '../providers/AuthContext'

const useAuth = () => {
  const auth = useContext(AuthContext)
  
  // Debug logging
  if (auth?.user) {
    console.log("useAuth returning user:", {
      email: auth.user.email,
      hasGetIdToken: typeof auth.user.getIdToken === 'function',
      userType: auth.user.constructor?.name || 'Unknown'
    });
  }
  
  return auth
}

export default useAuth
