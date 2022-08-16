import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { appcolor } from '../constants/appcolor'
import { useNavigation } from '@react-navigation/native'
import FavoritesScreen from '../screens/favorites'
import FavoriteRestaurantScreen from '../screens/favoriteRestaurant'
const Stack = createStackNavigator()

export default function FavoriteNavigation (props) {
  const navigation = useNavigation()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: appcolor.appHeaderBackgroundcolor,
        },
        headerTitleStyle: {
          color: appcolor.appHeaderTextcolor,
          fontFamily: appcolor.appHeaderFontFamility,
        },
        headerTitleAlign: 'left',
      }}
    >
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
        }}
      />
      <Stack.Screen
        name="FavoriteRestaurantScreen"
        component={FavoriteRestaurantScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={32}
              color={appcolor.appHeaderTextcolor}
              style={{ marginLeft: 24 }}
              onPress={() => {
                navigation.navigate('FavoritesScreen')
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
