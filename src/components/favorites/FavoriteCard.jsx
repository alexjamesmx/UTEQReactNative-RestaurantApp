import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback, View, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { appcolor } from '../../constants/appcolor'
import { styles } from '../restaurants/RestaurantCard.styles'
import { removeFavorites, getFavorites } from '../../firebase/firebase'
import useUser from '../../hooks/useUser'
import { useState, useEffect } from 'react'

export default function RestaurantCard (props) {
  const navigation = useNavigation()
  const { restaurant } = props
  const { finalUser } = useUser(finalUser)
  const [setExists] = useState(false)
  const { finalRefresh, setFinalRefresh } = useUser(finalRefresh)

  const goToRestaurant = () => {
    navigation.navigate('Restaurants', {
      screen: 'RestaurantScreen',
      params: {
        id: restaurant.id,
      },
    })
  }

  const handleFavorites = async () => {
    setFinalRefresh((prevState) => !prevState)
    await removeFavorites(restaurant.id, finalUser.docId)
  }

  useEffect(() => {
    ;(async () => {
      const res = await getFavorites(restaurant.id, finalUser.uid)
      if (res) {
        setExists(true)
      } else {
        setExists(false)
      }
    })()
  }, [])

  return (
    <TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={goToRestaurant}>
        <View style={styles.card}>
          <View style={styles.spacing}>
            <View style={styles.bgStyles}>
              <View style={styles.logoname}>
                <Text style={styles.name}>{restaurant?.name}</Text>
                <Image
                  source={{ uri: restaurant?.logo }}
                  style={styles.image}
                />
              </View>
              <View style={styles.numberdescription}>
                <Text style={styles.number}>
                  #{`${restaurant?.id}`.padStart(3, 0)}
                </Text>
                <Text style={styles.description}>
                  {restaurant?.description}
                </Text>
              </View>
              <View style={styles.favorites}>
                <Ionicons
                  name="heart"
                  size={32}
                  color={appcolor.appHeaderTextcolor}
                  onPress={handleFavorites}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableWithoutFeedback>
  )
}
