import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback, View, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { appcolor } from '../../constants/appcolor'
import { styles } from '../restaurants/RestaurantCard.styles'
import { addFavorites, getFavorites } from '../../firebase/firebase'
import useUser from '../../hooks/useUser'
import { useState, useEffect } from 'react'
export default function RestaurantCard (props) {
  const navigation = useNavigation()
  const { restaurant } = props
  const { finalUser } = useUser(finalUser)
  const [exists, setExists] = useState(false)
  const goToRestaurant = () => {
    navigation.navigate('Restaurants', {
      screen: 'RestaurantScreen',
      params: {
        id: restaurant.id,
      },
    })
  }

  const handleFavorites = async () => {
    const res = await addFavorites(
      restaurant.id,
      finalUser.uid,
      finalUser.docId,
    )
    if (res) {
      setExists((prevState) => !prevState)
    } else {
      setExists((prevState) => !prevState)
    }
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
                {exists
                  ? (
                  <Ionicons
                    name="heart"
                    size={32}
                    color={appcolor.appHeaderTextcolor}
                    onPress={handleFavorites}
                  />
                    )
                  : (
                  <Ionicons
                    name="heart-outline"
                    size={32}
                    color={appcolor.appHeaderTextcolor}
                    onPress={handleFavorites}
                  />
                    )}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableWithoutFeedback>
  )
}
