import { StyleSheet } from 'react-native'
import { appcolor } from '../constants/appcolor'

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: appcolor.background,
  },
  scrollView: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
