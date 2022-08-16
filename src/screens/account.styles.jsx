import { StyleSheet } from 'react-native'
import { appcolor } from '../constants/appcolor'

export const styles = StyleSheet.create({
  content: {
    backgroundColor: appcolor.background,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
})
