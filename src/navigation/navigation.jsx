import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import Restaurants from '../screens/restaurants'
import Favorites from '../screens/favorites'
import AccountNavigation from './accountNavigation'
const Tab = createBottomTabNavigator()

export default function Navigation () {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#6C170D',
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'green',
      }}
      initialRouteName="Restaurants"
    >
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            const color = focused ? 'yellow' : '#e1e1e1'
            return (
              <Icon
                type="material-community"
                name="heart"
                color={color}
                size={40}
              />
            )
          },
        }}
      />

      <Tab.Screen
        name="Restaurants"
        component={Restaurants}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            const color = focused ? 'yellow' : '#e1e1e1'
            return (
              <Icon
                type="material-community"
                name="silverware"
                color={color}
                size={40}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            const color = focused ? 'yellow' : '#e1e1e1'
            return (
              <Icon
                type="material-community"
                name="account"
                color={color}
                size={40}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}
