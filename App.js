import Navigation from './src/navigation/navigation'
import { NavigationContainer } from '@react-navigation/native'
import { UserProvider } from './src/context/UserContext'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
import Toast from 'react-native-toast-message'
import AppLoading from 'expo-app-loading'

export default function App () {
  const [fontsLoaded] = useFonts({
    Inter_900Black,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <UserProvider>
        <Navigation />
      </UserProvider>
      <Toast />
    </NavigationContainer>
  )
}
