import { Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Input, Icon, Button } from 'react-native-elements'
import { useFormik } from 'formik'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { styles } from './login.styles'
import * as Yup from 'yup'

export default function FormLogin () {
  function initialValues () {
    return {
      email: '',
      password: '',
    }
  }

  function validationSchema () {
    return Yup.object({
      email: Yup.string().email('El formato no es valido').required('El correo es obligatorio'),
      password: Yup.string().required('La contrasena es obligatoria'),
    })
  }

  const [MuestraContra, setMuestraContra] = useState(false)
  const MuestraOcultaContra = () => setMuestraContra((prevState) => !prevState)
  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
        navigation.navigate('Account')

        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Bienvenido ' + formValue.email,
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Usuario o contrasena incorrectos',
        })
        console.log(error)
      }
    },
  })

  return (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.loginTitle}>FOODOOK</Text>
        <Text style={styles.loginsubTitle}>Bienvenido</Text>

        <Input
          placeholder="Correo electrónico"
          containerStyle={styles.input}
          rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon} />}
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
              name="eye-outline"
              iconStyle={styles.icon}
              onPress={MuestraOcultaContra}
            />
          }
          onChangeText={(text) => formik.setFieldValue('password', text)}
          errorMessage={formik.errors.password}
        />
        <View style={{ marginTop: 30 }}>
          <Button
            title="Iniciar Sesion"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnLogin}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          />

          <Button
            title="¿No tienes cuenta? !Crea una!"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnRegister}
            type="outline"
            titleStyle={{ color: '#12355B' }}
            onPress={() => {
              navigation.navigate('Register')
            }}
          />
        </View>
      </View>
    </ScrollView>
  )
}
