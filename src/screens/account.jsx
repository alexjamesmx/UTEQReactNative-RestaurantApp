import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth, getUserInfo } from '../firebase/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserInfo from '../components/account/userInfo'
import Login from '../components/account/login'
import LoadingModal from '../utils/loadingModal'
import { styles } from './account.styles'
import useUser from '../hooks/useUser'

export default function Account () {
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(null)

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
    return (
      <SafeAreaView style={styles.content}>
        <Login />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.content}>
      <UserInfo setLoading={setLoading} />
      <LoadingModal show={loading} />
    </SafeAreaView>
  )
}
