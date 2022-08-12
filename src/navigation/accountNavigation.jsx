import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/account'
import RegisterScreen from '../screens/register'
import { appcolor } from '../constants/appcolor'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator()
export default function AccountNavigation () {
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
        name="AccountScreen"
        component={AccountScreen}
        options={{
          title: 'Mi cuenta',
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        headerShown={false}
        component={RegisterScreen}
        options={{
          title: 'Mi cuenta',
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={32}
              color={appcolor.appHeaderTextcolor}
              style={{ marginLeft: 24 }}
              onPress={() => {
                navigation.navigate('AccountScreen')
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
