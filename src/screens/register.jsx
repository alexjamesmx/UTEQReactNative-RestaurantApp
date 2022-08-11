import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Input, Icon } from 'react-native-elements'
import { useFormik } from 'formik'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import * as Yup from 'yup'
import { registerNewUser, updateUser } from '../firebase/firebase'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import useUser from '../hooks/useUser'
import { styles } from './register.styles'

export default function Register () {
  //  CONTEXTO DE USUARIO
  const { setUser } = useUser(null)
  // const { setUser } = useUser();
  //  CONTRASENAS
  const [MuestraContra, setMuestraContra] = useState(false)
  const MuestraOcultaContra = () => setMuestraContra((prevState) => !prevState)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 100,
      },
      headerLeft: () => (
        <FontAwesome5
          name="arrow-left"
          color="#222"
          size={30}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    })
  }, [navigation])

  function initialValues () {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    }
  }

  function validationSchema () {
    return Yup.object({
      email: Yup.string()
        .email('El formato no es valido')
        .required('El correo es obligatorio'),
      password: Yup.string().required('La contrasena es obligatoria'),
      repeatPassword: Yup.string()
        .required('La confirmacion es obligatoria')
        .oneOf([Yup.ref('password')], 'Las contrasenas no coinciden'),
      name: Yup.string().required('El nombre de usuario es obligatorio'),
    })
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth()
        const res = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password,
        )

        const addUserResponse = await registerNewUser({
          uid: res.user.uid,
          name: formValue.name,
          favorites: {},
        })

        const user = {
          uid: res.user.uid,
          name: formValue.name,
          email: formValue.email,
          favorites: {},
          docId: addUserResponse.id,
        }

        await updateUser(addUserResponse.id, user)

        setUser(user)

        navigation()
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error al registrarse, intentalo mas tarde',
        })
        console.log(error)
      }
    },
  })

  return (
    <View style={styles.content}>
      <ScrollView>
        <Text style={styles.loginTitle}>Crea un usuario</Text>
        <View style={styles.contentForm}>
          <Input
            placeholder="Nombre"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name="account"
                iconStyle={styles.icon}
              />
            }
            onChangeText={(text) => formik.setFieldValue('name', text)}
            errorMessage={formik.errors.name}
          />
          <Input
            placeholder="Correo electrónico"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name="at"
                iconStyle={styles.icon}
              />
            }
            onChangeText={(text) => formik.setFieldValue('email', text)}
            errorMessage={formik.errors.email}
          />
          <Input
            placeholder="Contraseña"
            containerStyle={styles.input}
            secureTextEntry={!MuestraContra}
            rightIcon={
              <Icon
                type="material-community"
                name={MuestraContra ? 'eye-off-outline' : 'eye-outline'}
                iconStyle={styles.icon}
                onPress={MuestraOcultaContra}
              />
            }
            onChangeText={(text) => formik.setFieldValue('password', text)}
            errorMessage={formik.errors.password}
          />
          <Input
            placeholder="Repetir contraseña"
            containerStyle={styles.input}
            secureTextEntry={!MuestraContra}
            rightIcon={
              <Icon
                type="material-community"
                name={MuestraContra ? 'eye-off-outline' : 'eye-outline'}
                iconStyle={styles.icon}
                onPress={MuestraOcultaContra}
              />
            }
            onChangeText={(text) =>
              formik.setFieldValue('repeatPassword', text)
            }
            errorMessage={formik.errors.repeatPassword}
          />
          <Button
            title="Registrarse"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnLogin}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          />
        </View>
      </ScrollView>
    </View>
  )
}
