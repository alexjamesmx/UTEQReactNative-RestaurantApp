import { Text, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

import { useNavigation } from '@react-navigation/native'

export default function NotLoggedInFavorites () {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.mensaje}>
        Debes tener una sesion activa para poder visualizar tus favoritos!
      </Text>

      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogin}
        onPress={() => {
          navigation.navigate('AccountScreen')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#78df0',
    margin: 40,
  },
  btnContainer: {
    marginTop: 10,
    color: 'black',
  },
  btnLogin: {
    backgroundColor: '#FF570A',
    height: 50,
    borderRadius: 16,
    marginVertical: 16,
  },
  mensaje: {
    textAlign: 'center',
  },
})
