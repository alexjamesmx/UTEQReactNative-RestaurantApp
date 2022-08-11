import { Overlay } from 'react-native-elements'
import { View, ActivityIndicator } from 'react-native'

export default function LoadingModal (props) {
  const { show } = props

  return (
    <Overlay isVisible={show}>
      <View>
        <ActivityIndicator size="large" color="#00a680" />
      </View>
    </Overlay>
  )
}

LoadingModal.defaultProps = {
  show: false,
}
