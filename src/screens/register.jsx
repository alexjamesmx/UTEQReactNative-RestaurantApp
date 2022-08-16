import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Icon } from 'react-native-elements'
import { useFormik } from 'formik'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import * as Yup from 'yup'
import { registerNewUser, updateUser, login } from '../firebase/firebase'
import useUser from '../hooks/useUser'
import { styles } from './register.styles'

export default function Register () {
  //  CONTEXTO DE USUARIO
  const { setUser } = useUser(null)

  //  CONTRASENAS
  const [MuestraContra, setMuestraContra] = useState(false)
  const MuestraOcultaContra = () => setMuestraContra((prevState) => !prevState)
  const navigation = useNavigation()

  function initialValues () {
    return {
      name: '',
      phone: '',
      address: '',
      email: '',
      password: '',
      repeatPassword: '',
    }
  }

  function validationSchema () {
    return Yup.object({
      email: Yup.string()
        .email('El formato no es valido')
        .required('El correo es requerido'),
      password: Yup.string()
        .required('La contrasena es requerida')
        .min(6, 'Minimo debe contener 6 caracteres'),
      repeatPassword: Yup.string()
        .required('La confirmacion es requerida')
        .oneOf([Yup.ref('password')], 'Las contrasenas no coinciden'),
      name: Yup.string().required('El nombre es requerido'),
      phone: Yup.string()
        .required('El telefono es requerido')
        .matches(/^[0-9]+$/, 'Deben ser sólo numeros')
        .min(10, 'Debe ser de 10 digitos')
        .max(10, 'Debe ser de 10 digitos'),
      address: Yup.string().required('La direccion es requerida'),
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
          address: formValue.address,
          phone: formValue.phone,
          favorites: {},
        })

        const user = {
          uid: res.user.uid,
          name: formValue.name,
          email: formValue.email,
          address: formValue.address,
          phone: formValue.phone,
          favorites: {},
          docId: addUserResponse.id,
        }

        await updateUser(addUserResponse.id, user)

        setUser(user)

        await login(auth, formValue.email, formValue.password)
        navigation.navigate('AccountScreen')
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
            placeholder="Telefono"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name="phone"
                iconStyle={styles.icon}
              />
            }
            onChangeText={(text) => formik.setFieldValue('phone', text)}
            errorMessage={formik.errors.phone}
          />
          <Input
            placeholder="Dirección"
            containerStyle={styles.input}
            rightIcon={
              <Icon
                type="material-community"
                name="home"
                iconStyle={styles.icon}
              />
            }
            onChangeText={(text) => formik.setFieldValue('address', text)}
            errorMessage={formik.errors.address}
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
