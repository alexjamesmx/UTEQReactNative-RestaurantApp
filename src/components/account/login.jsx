import { Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Input, Icon, Button } from 'react-native-elements'
import { useFormik } from 'formik'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import * as Yup from "yup"
import Register from './register'
export default function FormLogin() {
const [willRegister, setWillRegister] = useState(0)


 function initialValues(){
    return{
        email:'',
        password:'',
    }
}

 function validationSchema(){
    return Yup.object({
        email: Yup.string()
            .email("El formato no es valido")
            .required("El correo es obligatorio"),
        password:Yup.string()
        .required("La contrasena es obligatoria"),
    })
}

  const [MuestraContra,setMuestraContra] = useState(false);
  const MuestraOcultaContra = () => setMuestraContra((prevState)=>!prevState)
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues : initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async(formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
        navigation.navigate('Account');

        
        Toast.show({
          type:'success',
          position:'top',
          text1:"Bienvenido " + formValue.email
        })
      } catch (error) {
          Toast.show({
            type:'error',
            position:'bottom',
            text1:"Usuario o contrasena incorrectos"
          })
          console.log(error);
      }
  
    }
  })
if(willRegister){
  return( 
  <Register/>
  )
}


  return (
    <>
    <Text>Log in</Text>
      <Input
        placeholder='Correo electronico'
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.icon} />}
      onChangeText={text=>formik.setFieldValue('email',text)}
      errorMessage={formik.errors.email}
      />
      <Input
        placeholder='Contrasena'
        containerStyle={styles.input}
        secureTextEntry={MuestraContra ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name="eye-outline"
            iconStyle={styles.icon}
            onPress={MuestraOcultaContra} />}
            onChangeText={text=>formik.setFieldValue('password',text)}
            errorMessage={formik.errors.password}
      />
      <Button
      title="Iniciar Sesion"
      containerStyle={styles.btnContainer}
      buttonStyle={styles.btn}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}/>


        <Text 
            style={styles.textRegistro}
            onPress={()=> {setWillRegister(1)} }>Registrarse</Text>
    </>
  )


}


 const styles = StyleSheet.create({
    content:{
        flex:1,
        alignItems:"center",
        justifyContnent:"center",
        marginTop:30,
    },
    input:{
        width:"100%",
        marginTop:20,
    },
    icon:{
        color:"#c1c1c1",
    },
    btnContainer:{
        marginTop:20,
        width:"95%",
    },
    btn:{
        backgroundColor:"#00a680"
    }
});