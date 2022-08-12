import { StyleSheet } from 'react-native'
import { appcolor } from '../constants/appcolor'

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: appcolor.background,
  },
  contentForm: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  loginTitle: {
    fontWeight: 'bold',
    fontSize: appcolor.titulo,
    textAlign: 'center',
    marginBottom: 50,
    marginVertical: 20,
  },
  input: {
    width: '100%',
    color: 'green',
  },
  icon: {
    color: '#12355B',
  },
  btnContainer: {
    marginTop: 20,
    color: 'black',
  },
  btnLogin: {
    backgroundColor: appcolor.boton,
    height: 50,
    borderRadius: 16,
  },
})
