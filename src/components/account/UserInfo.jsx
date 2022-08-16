/* eslint-disable multiline-ternary */
import { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Avatar, Button, Icon, Input } from 'react-native-elements'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import useUser from '../../hooks/useUser'
import { styles } from './UserInfo.styles'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { updateUserDetails } from '../../firebase/firebase'
export default function UserInfo (props) {
  const { setLoading, onRefresh } = props

  const [edit, setEdit] = useState(false)
  const { finalUser } = useUser(finalUser)
  const [addressValue, setAddressValue] = useState(finalUser.address)
  const [phoneValue, setPhoneValue] = useState(finalUser.phone)

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
  const handleEdit = () => {
    formik.setFieldValue('phone', phoneValue)
    formik.setFieldValue('address', addressValue)
    setEdit((prevstate) => !prevstate)
  }

  const handleCancel = async () => {
    setEdit((prevstate) => !prevstate)
    setAddressValue(finalUser.address)
    setPhoneValue(finalUser.phone)
  }

  function validationSchema () {
    return Yup.object({
      phone: Yup.string()
        .required('El telefono es requerido')
        .matches(/^[0-9]+$/, 'Deben ser sólo numeros')
        .min(10, 'Debe ser de 10 digitos')
        .max(10, 'Debe ser de 10 digitos'),
      address: Yup.string().required('La direccion es requerida'),
    })
  }
  const formik = useFormik({
    initialValues: {
      address: finalUser.address,
      phone: finalUser.phone,
    },
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        setEdit((prevstate) => !prevstate)

        await updateUserDetails(
          finalUser.docId,
          formValue.phone,
          formValue.address,
        )

        onRefresh()
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Usuario actualizado',
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error al actualizar, intentalo mas tarde',
        })
        console.log(error)
      }
    },
  })

  return (
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
      {finalUser ? (
        <>
          <Text style={styles.subtitle}>{finalUser.name}</Text>
          <Text style={styles.email}>{finalUser.email}</Text>
        </>
      ) : (
        <Text style={styles.subtitle}>Anonimo</Text>
      )}
      {finalUser ? (
        <>
          <Input
            value={phoneValue}
            placeholder={finalUser.phone}
            containerStyle={styles.inputContainer}
            rightIcon={
              <Icon
                type="material-community"
                name="phone"
                iconStyle={styles.icon}
              />
            }
            onChangeText={(text) => {
              console.log('text', text)
              console.log('phone', phoneValue)
              setPhoneValue(text)
              formik.setFieldValue('phone', text)
            }}
            errorMessage={formik.errors.phone}
            disabled={!edit}
          />
          <Input
            value={addressValue}
            placeholder={finalUser.address}
            containerStyle={styles.inputContainer}
            rightIcon={
              <Icon
                type="material-community"
                name="home"
                iconStyle={styles.icon}
              />
            }
            onChangeText={(text) => {
              setAddressValue(text)
              formik.setFieldValue('address', text)
            }}
            errorMessage={formik.errors.address}
            disabled={!edit}
          />
        </>
      ) : (
        <></>
      )}
      {edit ? (
        <View style={styles.btnContainer}>
          <Button
            title="Cancelar"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnCancel}
            onPress={handleCancel}
          />
          <Button
            title="Guardar"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnSave}
            onPress={() => {
              formik.handleSubmit()
            }}
            loading={formik.isSubmitting}
          />
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <Button
            title="Editar"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnSave}
            onPress={handleEdit}
          />
        </View>
      )}

      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  )
}
