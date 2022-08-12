import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import Favorites from '../screens/favorites'
import AccountNavigation from './accountNavigation'
import RestaurantNavigation from './restaurantNavigation'
import { appcolor } from '../constants/appcolor'
const Tab = createBottomTabNavigator()

export default function Navigation () {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: appcolor.appTabBarBackgroundColor,
        },
        tabBarShowLabel: false,

        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: appcolor.appHeaderBackgroundcolor,
        },
        headerTitleStyle: {
          color: appcolor.appHeaderTextcolor,
          fontFamily: appcolor.appHeaderFontFamility,
        },
      }}
      initialRouteName="Restaurants"
    >
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            const color = focused
              ? appcolor.appTabBarIconColorOnFocused
              : appcolor.appTabBarIconColorOnFocusedOff
            return (
              <Icon
                type="material-community"
                name="heart"
                color={color}
                size={appcolor.appTabBarIconSize}
              />
            )
          },
        }}
      />

      <Tab.Screen
        name="Restaurants"
        component={RestaurantNavigation}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            const color = focused
              ? appcolor.appTabBarIconColorOnFocused
              : appcolor.appTabBarIconColorOnFocusedOff
            return (
              <Icon
                type="material-community"
                name="silverware"
                color={color}
                size={appcolor.appTabBarIconSize}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Mi Cuenta"
        component={AccountNavigation}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => {
            const color = focused
              ? appcolor.appTabBarIconColorOnFocused
              : appcolor.appTabBarIconColorOnFocusedOff
            return (
              <Icon
                type="material-community"
                name="account"
                color={color}
                size={appcolor.appTabBarIconSize}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}
