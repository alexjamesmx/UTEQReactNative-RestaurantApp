import { FlatList, StyleSheet, Platform } from 'react-native'
import FavoriteCard from './FavoriteCard'
import { useState } from 'react'

export default function RestaurantList (props) {
  const { restaurants, handleRefresh } = props
  const [refreshing] = useState(false)

  return (
    <>
      <FlatList
        data={restaurants}
        horizontal={false}
        numColumns={1}
        keyExtractor={(restaurant) => String(restaurant.id)}
        renderItem={({ item }) => <FavoriteCard restaurant={item} />}
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
