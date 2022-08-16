import { useState, useEffect, useCallback } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth, getUserInfo } from '../firebase/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserInfo from '../components/account/UserInfo'
import Login from '../components/account/Login'
import LoadingModal from '../utils/loadingModal'
import { styles } from './account.styles'
import useUser from '../hooks/useUser'
import { ScrollView, RefreshControl } from 'react-native'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export default function Account () {
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

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
  }, [auth, loggedIn, refreshing])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(1000).then(() => setRefreshing(false))
  }, [])

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.content}>
        <Login />
      </SafeAreaView>
    )
  }

  return (
    // <SafeAreaView style={styles.content}>
    <ScrollView
      style={styles.content}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <UserInfo setLoading={setLoading} onRefresh={onRefresh} />
      <LoadingModal show={loading} />
    </ScrollView>
  )
}
