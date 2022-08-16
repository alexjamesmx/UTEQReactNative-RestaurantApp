import { StyleSheet } from 'react-native'
import { appcolor } from '../../constants/appcolor'

export const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: '80%',
    height: '85%',
    backgroundColor: '#e3e3e3',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#00000030',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  subtitle: {
    color: '#181818',
    fontSize: appcolor.subtitle,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  email: {
    color: 'grey',
    fontSize: appcolor.text,
    fontWeight: '400',
    marginBottom: 50,
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  details: {
    color: '#181818',
    fontSize: appcolor.texto,
    marginTop: 15,
    marginHorizontal: 20,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#181818',
    padding: 8,
  },
  avatar: {
    backgroundColor: 'green',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: appcolor.negro,
    width: '100%',
    height: 35,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonEditar: {
    backgroundColor: '#06A7BA',
    width: '100%',
    height: 35,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    border: 'none',
  },

  inputContainerFocus: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    marginBottom: 20,
  },
  textInput: {
    paddingLeft: 10,
    flex: 1,
    textAlign: 'justify',
  },
  textInputFocus: {
    paddingLeft: 10,
    flex: 1,
    height: 50,
    textAlign: 'justify',
    fontSize: 16,
  },
  btnContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnCancel: {
    backgroundColor: 'red',
  },
  btnSave: {
    backgroundColor: 'grey',
  },
})
