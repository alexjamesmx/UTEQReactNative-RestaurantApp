import {View, Text, StyleSheet} from "react-native";
import React, {useState, useEffect} from "react";
import {Button, Input, Icon} from "react-native-elements";
import {useFormik} from "formik";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import {SafeAreaView} from "react-native-safe-area-context";
import {registerNewUser} from "../firebase/firebase";
import { appcolor } from "../constatns/appcolor";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
export default function Register() {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome5
          name="arrow-left"
          color="#222"
          size={30}
          style={{marginLeft: 20}}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation]);

  function initialValues() {
    return {
      name: "",
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
      name: Yup.string().required("El nombre de usuario es obligatorio"),
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
          formValue.password
        );

        const newUser = await registerNewUser({
          uid: res.user.uid,
          name: formValue.name,
          favorites: {},
        });

        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al registrarse, intentalo mas tarde",
        });
        console.log(error);
      }
    },
  });


  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.contentForm}>
      <Text style={styles.loginTitle}>Crea un usuario</Text>
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
        onChangeText={(text) => formik.setFieldValue("name", text)}
        errorMessage={formik.errors.name}
      />
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
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
        placeholder="Repetir contraseña"
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
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnLogin}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
      </View>
       
      <Toast />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  content:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: appcolor.background,
  },
  contentForm: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  loginTitle: {
    position: "absolute",
    fontWeight: "bold",
    fontSize: 42,
    textAlign: "center",
    top: -10,
    left: 0,
    right: 0,
    bottom:0,
  },
  input: {
    width: "100%",
    marginTop: 20,
    color: "green",
  },
  icon: {
    color: "#12355B",
  },
  btnContainer: {
    marginTop: 10,
    color: "black",
  },
  btnLogin: {
    backgroundColor: "#FF570A",
    height: 50,
    borderRadius: 16,
  },
})