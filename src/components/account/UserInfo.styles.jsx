import { StyleSheet } from 'react-native'
import { appcolor } from '../../constants/appcolor'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appcolor.background,
  },
  cardContainer: {
    width: '80%',
    height: '80%',
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
    marginTop: 15,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  details: {
    color: '#181818',
    fontSize: appcolor.texto,
    marginTop: 15,
    marginHorizontal: 20,
    textAlign: 'center',
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
    marginVertical: 24,
  },
})
