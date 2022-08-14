import { StyleSheet } from 'react-native'
import { appcolor } from '../../constants/appcolor'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: appcolor.background,
  },
  spacing: {
    padding: 5,
  },
  bgStyles: {
    borderRadius: 15,
    paddingVertical: 15,
    backgroundColor: 'grey',
    flexDirection: 'row',
    height: 150,
  },

  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
    paddingBottom: 10,
  },
  image: {
    width: '70%',
    height: '70%',
  },
  description: {
    textTransform: 'capitalize',
    textAlign: 'left',
    marginVertical: 6,
  },
  number: {
    position: 'absolute',
    right: 10,
    color: '#fff',
    fontSize: 11,
  },
  logoname: {
    flex: 1,
    width: '50%',
    alignItems: 'center',
    marginLeft: 5,
  },
  numberdescription: {
    padding: 20,
    width: '30%',
    alignItems: 'center',
  },
  favorites: {
    width: '20%',
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'center',
  },
})
