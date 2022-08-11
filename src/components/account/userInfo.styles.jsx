import { StyleSheet } from 'react-native'
import { appcolor } from '../../constatns/appcolor'

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
    backgroundColor: '#fff',
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
  title: {
    color: '#181818',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  details: {
    color: '#181818',
    fontSize: 16,
    marginTop: 15,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: 'green',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#000',
    width: '100%',
    height: 35,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
