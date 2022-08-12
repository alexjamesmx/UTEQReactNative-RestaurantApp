import { useNavigation } from '@react-navigation/native'
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native'
import { appcolor } from '../../constants/appcolor'

export default function RestaurantCard (props) {
  const navigation = useNavigation()
  const { restaurant } = props

  const goToRestaurant = () => {
    navigation.navigate('RestaurantScreen', { id: restaurant.id })
  }

  return (
    <TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={goToRestaurant}>
        <View style={styles.card}>
          <View style={styles.spacing}>
            <View style={styles.bgStyles}>
              <Text style={styles.number}>
                #{`${restaurant?.id}`.padStart(3, 0)}
              </Text>
              <Text style={styles.name}>{restaurant?.name}</Text>
              <Image source={{ uri: restaurant?.logo }} style={styles.image} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: appcolor.background,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'grey',
  },
  number: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#fff',
    fontSize: 11,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  image: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    paddingVertical: 20,
  },
})
