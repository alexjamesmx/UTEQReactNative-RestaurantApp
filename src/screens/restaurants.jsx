import { useEffect, useState, useCallback } from 'react'
import { getRestaurants } from '../firebase/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import RestaurantList from '../components/restaurants/RestaurantList'
import { StyleSheet } from 'react-native'
import { appcolor } from '../constants/appcolor'
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export default function Restaurants () {
  const [restaurants, setRestaurants] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    ;(async () => {
      setRestaurants(await getRestaurants())
    })()
  }, [refreshing])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(1000).then(() => setRefreshing(false))
  }, [])

  function handleRefresh () {
    onRefresh()
  }
  return (
    <SafeAreaView style={styles.container}>
      <RestaurantList restaurants={restaurants} handleRefresh={handleRefresh} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appcolor.background,
    flex: 1,
  },
})
