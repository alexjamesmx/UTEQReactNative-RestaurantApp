import { TouchableWithoutFeedback, View, Text, Image } from 'react-native'
import { styles } from './MenuCard.styles'
export default function MenuCard (props) {
  const { comida } = props

  return (
    // <Text>SOY COMIDA</Text>
    <TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.card}>
          <View style={styles.spacing}>
            <View style={styles.bgStyles}>
              <Text style={styles.number}>
                #{`${comida?.id}`.padStart(3, 0)}
              </Text>
              <Text style={styles.name}>{comida?.name}</Text>
              <Image source={{ uri: comida?.logo }} style={styles.image} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </TouchableWithoutFeedback>
  )
}
