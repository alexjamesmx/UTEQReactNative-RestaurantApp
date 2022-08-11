import React, { useState, createContext } from 'react'

export const UserContext = createContext({
  finalUser: undefined,
  setUser: () => {},
})

export function UserProvider (props) {
  const { children } = props
  const [finalUser, setFinalUser] = useState(undefined)

  const setUser = (userData) => {
    setFinalUser(userData)
  }
  const valueContext = {
    finalUser,
    setUser,
  }

  return (
    <UserContext.Provider value={valueContext}>{children}</UserContext.Provider>
  )
}
