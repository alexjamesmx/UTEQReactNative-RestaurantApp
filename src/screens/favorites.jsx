import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState, useCallback } from 'react'
import { auth, getAllFavorites, getUserInfo } from '../firebase/firebase'
import NotLoggedInFavorites from '../components/favorites/NotLoggedInFavorites'
import FavoritesList from '../components/favorites/FavoritesList'
import useUser from '../hooks/useUser'
import { styles } from './searchBar.styles'
import { View, TextInput, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { appcolor } from '../constants/appcolor'
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export default function Favorites () {
  const [restaurants, setRestaurants] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [filteredDataSource, setFilteredDataSource] = useState([])
  const [search, setSearch] = useState('Buscar Favorito')
  const [loggedIn, setLoggedIn] = useState(false)

  const { finalRefresh } = useUser(finalRefresh)

  const { setUser, finalUser } = useUser(null)

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

  useEffect(() => {
    ;(async () => {
      setRestaurants(await getAllFavorites(finalUser.uid))
      setFilteredDataSource(await getAllFavorites(finalUser.uid))
    })()
  }, [refreshing, finalRefresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(1000).then(() => setRefreshing(false))
  }, [])

  function handleRefresh () {
    onRefresh()
  }
  const handleSearch = (text) => {
    setSearch(text)
    if (text) {
      const newData = restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(text.toLowerCase())
      })
      setFilteredDataSource(newData)
    }
    if (!text) {
      setFilteredDataSource(restaurants)
      setSearch('Buscar Favorito')
    }
  }
  if (!loggedIn) {
    return <NotLoggedInFavorites />
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={24} color="gray" />
        <TextInput
          placeholder={search}
          style={styles.textInput}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      {restaurants.length > 0
        ? (
        <FavoritesList
          restaurants={filteredDataSource}
          handleRefresh={handleRefresh}
          search={search}
          handleSearch={handleSearch}
        />
          )
        : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ marginBottom: '30%', fontSize: appcolor.subtitle }}>
            !No tienes agregados restaurantes favoritos!
          </Text>
        </View>
          )}
    </View>
  )
}
