import { StyleSheet, Platform, FlatList } from 'react-native'
import MenuCard from './MenuCard'
import { useState } from 'react'

export default function MenuList (props) {
  const { menu, handleRefresh } = props
  const [refreshing] = useState(false)

  return (
    <>
      <FlatList
        data={menu}
        numColumns={3}
        keyExtractor={(comida) => String(comida.name)}
        renderItem={({ item }) => <MenuCard comida={item} />}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </>
  )
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    marginTop: Platform.OS === 'android' ? 0 : 0,
  },

  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === 'android' ? 70 : 60,
  },
})
