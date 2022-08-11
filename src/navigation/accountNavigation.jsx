import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/account'
import Register from '../screens/register'

import { appcolor } from '../constatns/appcolor'
const Stack = createStackNavigator()

export default function AccountNavigation () {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        headerShown={false}
        component={Register}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: appcolor.background,
          },
        }}
      />
    </Stack.Navigator>
  )
}
