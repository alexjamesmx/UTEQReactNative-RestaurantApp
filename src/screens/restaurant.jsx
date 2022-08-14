import { useEffect, useState, useCallback } from 'react'
import { getMenu } from '../firebase/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import MenuList from '../components/menu/MenuList'
import { appcolor } from '../constants/appcolor'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export default function RestaurantNavigation (props) {
  const { route } = props
  const [refreshing, setRefreshing] = useState(false)
  const [menu, setMenu] = useState([])

  useEffect(() => {
    ;(async () => {
      setMenu(await getMenu(route.params.id))
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
      <MenuList menu={menu} getMenu={getMenu} handleRefresh={handleRefresh} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appcolor.background,
    flex: 1,
  },
})
