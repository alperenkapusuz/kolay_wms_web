import React, { useContext, useState, useEffect } from "react"
import firebase,{auth} from "../firebase/Firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email,password)//auth.createUserWithEmailAndPassword(email, password)
    
  }

  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email,password)//auth.signInWithEmailAndPassword(email, password)
  }

  function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email)//auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}