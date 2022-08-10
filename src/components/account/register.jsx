import {View,Text, StyleSheet} from "react-native";
import React, {useState} from "react";
import {Button, Input, Icon} from "react-native-elements";
import {useFormik} from "formik";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import {Toast} from "react-native-toast-message/lib/src/Toast";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerNewUser } from "../../firebase/firebase";
export default function Register() {
  function initialValues() {
    return {
      name:'',
      email: "",
      password: "",
      repeatPassword: "",
    };
  }

  function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("El formato no es valido")
        .required("El correo es obligatorio"),
      password: Yup.string().required("La contrasena es obligatoria"),
      repeatPassword: Yup.string()
        .required("La confirmacion es obligatoria")
        .oneOf([Yup.ref("password")], "Las contrasenas no coinciden"),
        name: Yup.string().required('El nombre de usuario es obligatorio')
    });
  }
  const [MuestraContra, setMuestraContra] = useState(false);
  const navigation = useNavigation();
  const MuestraOcultaContra = () => setMuestraContra((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const res = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password,
        );
        
        const newUser = await registerNewUser({
          uid: res.user.uid,
          name: formValue.name,
          favorites: {}
        })
          
        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrarse, intentelo mas tarde",
        });
        console.log(error);
      }

    },


    
  });

  return (
    <SafeAreaView styles={styles.content}>

      <Text>Registrate</Text>
      <Input
        placeholder="Nombre de usuario"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="account" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("name", text)}
        errorMessage={formik.errors.name}
      />
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contrasena"
        containerStyle={styles.input}
        secureTextEntry={MuestraContra ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={MuestraContra ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={MuestraOcultaContra}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Repetir contrasena"
        containerStyle={styles.input}
        secureTextEntry={MuestraContra ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={MuestraContra ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={MuestraOcultaContra}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#00a688",
  },
  btnContainer: {
    marginBottom: 20,
    width: "95%",
  },
  icon: {
    color: "#ac1c1c1",
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  content:{
    flex:1,
    paddingBottom:20,
  }

});
