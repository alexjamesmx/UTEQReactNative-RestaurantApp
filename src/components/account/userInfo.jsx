import { useState, useCallback } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import useUser from '../../hooks/useUser'
import { styles } from './userInfo.styles'

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export default function UserInfo (props) {
  const { setLoading } = props
  const [refreshing, setRefreshing] = useState(false)

  const { finalUser } = useUser(finalUser)
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(1000).then(() => setRefreshing(false))
  }, [])

  console.log('final', finalUser)

  const { uid, photoURL } = getAuth().currentUser
  const [avatar, setAvatar] = useState(photoURL)

  const cambiaAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) subeImagen(result.uri)
  }

  const subeImagen = async (uri) => {
    setLoading(true)

    const response = await fetch(uri)
    const blob = await response.blob()
    const storage = getStorage()
    const storageRef = ref(storage, `avatar/${uid}`)

    uploadBytes(storageRef, blob).then((snapshot) => {
      updateFotoUrl(snapshot.metadata.fullPath)
    })
  }

  const updateFotoUrl = async (imagePath) => {
    const storage = getStorage()
    const imageRef = ref(storage, imagePath)
    const imageUrl = await getDownloadURL(imageRef)

    const auth = getAuth()

    updateProfile(auth.currentUser, { photoURL: imageUrl })
    setAvatar(imageUrl)
    setLoading(false)

    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Carga exitosa!',
    })
  }

  const handleSignOut = async () => {
    const auth = getAuth()
    await signOut(auth)
  }
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.cardContainer}>
        <Avatar
          size={150}
          rounded
          containerStyle={styles.avatar}
          icon={{ type: 'material', name: 'person' }}
          source={{ uri: avatar }}
        >
          <Avatar.Accessory size={24} onPress={cambiaAvatar} />
        </Avatar>
        {finalUser
          ? (
          <Text style={styles.title}>{finalUser.name}</Text>
            )
          : (
          <Text style={styles.title}>Anonimo</Text>
            )}
        {finalUser
          ? (
          <Text style={styles.details}>Email: {finalUser.email}</Text>
            )
          : (
          <></>
            )}
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
