import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth, getUserInfo } from '../firebase/firebase'
import NotLoggedInFavorites from '../components/favorites/NotLoggedInFavorites'
import FavoritesList from '../components/favorites/FavoritesList'
import useUser from '../hooks/useUser'

export default function Favorites () {
  const [loggedIn, setLoggedIn] = useState(false)
  const { setUser } = useUser(null)
  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user)
    })

    if (loggedIn) {
      ;(async () => {
        const res = await getUserInfo(auth.currentUser.uid)
        setUser(res)
      })()
    }
  }, [auth, loggedIn])

  if (!loggedIn) {
    return <NotLoggedInFavorites />
  }

  return <FavoritesList />
}
