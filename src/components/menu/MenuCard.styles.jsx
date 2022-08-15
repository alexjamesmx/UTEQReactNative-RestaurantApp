import { StyleSheet } from 'react-native'
import { appcolor } from '../../constants/appcolor'

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'grey',
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'grey',
  },
  number: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#fff',
    fontSize: 11,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  image: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    paddingVertical: 20,
  },
})
