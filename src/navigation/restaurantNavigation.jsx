import { createStackNavigator } from '@react-navigation/stack'
import RestaurantsScreen from '../screens/restaurants'
import RestaurantScreen from '../screens/restaurant'
import { Ionicons } from '@expo/vector-icons'
import { appcolor } from '../constants/appcolor'
import { useNavigation } from '@react-navigation/native'
import { SearchBar } from 'react-native-elements'
const Stack = createStackNavigator()

export default function RestaurantNavigation (props) {
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
        name="RestaurantsScreen"
        component={RestaurantsScreen}
        options={{
          title: 'FooDook',
          headerTitleContainerStyle: {},
        }}
      />
      <Stack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{
          title: '',
          headerLeft: () => (
            <SearchBar></SearchBar>
            // <Ionicons
            //   name="arrow-back"
            //   size={32}
            //   color={appcolor.appHeaderTextcolor}
            //   style={{ marginLeft: 24 }}
            //   onPress={() => {
            //     navigation.navigate('RestaurantsScreen')
            //   }}
            // />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
