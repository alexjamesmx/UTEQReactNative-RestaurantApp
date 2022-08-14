import { StyleSheet } from 'react-native'
import { appcolor } from '../constants/appcolor'
export const styles = StyleSheet.create({
  container: {
    backgroundColor: appcolor.background,
    flex: 1,
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 24,
    alignSelf: 'center',
  },
  textInput: {
    paddingLeft: 10,
    flex: 1,
    height: 40,
    fontSize: appcolor.texto,
  },
})
