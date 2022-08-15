import { useEffect, useState, useCallback } from 'react'
import { getRestaurants, auth, getUserInfo } from '../firebase/firebase'
import RestaurantList from '../components/restaurants/RestaurantList'
import { View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './searchBar.styles'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import useUser from '../hooks/useUser'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export default function Restaurants () {
  const [restaurants, setRestaurants] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [filteredDataSource, setFilteredDataSource] = useState([])
  const [search, setSearch] = useState('Buscar Restaurante')
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

  useEffect(() => {
    console.log('refrescando restaurantes')
    ;(async () => {
      setRestaurants(await getRestaurants())
      setFilteredDataSource(await getRestaurants())
    })()
  }, [refreshing])

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
      setSearch('Buscar Restaurante')
    }
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
      <RestaurantList
        restaurants={filteredDataSource}
        handleRefresh={handleRefresh}
        search={search}
        handleSearch={handleSearch}
      />
    </View>
  )
}
