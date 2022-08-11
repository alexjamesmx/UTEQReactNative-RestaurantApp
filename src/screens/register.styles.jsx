import { StyleSheet } from 'react-native'
import { appcolor } from '../constatns/appcolor'

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: appcolor.background,
    height: 1000,
  },
  contentForm: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  loginTitle: {
    fontWeight: 'bold',
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 50,
    marginVertical: 40,
  },
  input: {
    width: '100%',
    marginTop: 20,
    color: 'green',
  },
  icon: {
    color: '#12355B',
  },
  btnContainer: {
    marginTop: 10,
    color: 'black',
  },
  btnLogin: {
    backgroundColor: '#FF570A',
    height: 50,
    borderRadius: 16,
  },
})
