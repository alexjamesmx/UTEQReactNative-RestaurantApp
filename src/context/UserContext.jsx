import React, { useState, createContext } from 'react'

export const UserContext = createContext({
  finalUser: undefined,
  setUser: () => {},
  finalRefresh: false,
  setFinalRefresh: () => {},
})

export function UserProvider (props) {
  const { children } = props
  const [finalUser, setFinalUser] = useState(undefined)
  const [finalRefresh, setRefreshfinal] = useState(false)

  const setUser = (userData) => {
    setFinalUser(userData)
  }
  const setFinalRefresh = (userData) => {
    console.log('FINAL REFRESH')
    setRefreshfinal(userData)
  }
  const valueContext = {
    finalUser,
    setUser,
    finalRefresh,
    setFinalRefresh,
  }

  return (
    <UserContext.Provider value={valueContext}>{children}</UserContext.Provider>
  )
}
