import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {Avatar, Button, Text} from "react-native-elements";
import {getAuth, signOut, updateProfile} from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import Toast from "react-native-toast-message";

export default function UserInfo(props) {
  const {setLoading} = props;
  const {uid, photoURL, email, displayName} = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  const cambiaAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) subeImagen(result.uri);
  };

  const subeImagen = async (uri) => {
    ("Actualizando Avatar...co");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updateFotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updateFotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);

    const auth = getAuth();

    updateProfile(auth.currentUser, {photoURL: imageUrl});
    setAvatar(imageUrl);
    setLoading(false);
    console.log("bien", imagePath);

    Toast.show({
      type: "success",
      position: "top",
      text1: "Carga exitosa!",
    });
  };
  async function handleSignOut() {
    const auth = getAuth();
    await signOut(auth);
  }
  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{type: "material", name: "person"}}
        source={{uri: avatar}}
      >
        <Avatar.Accessory size={24} onPress={cambiaAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anonimo"}</Text>
        <Text> {email} </Text>
      </View>
      <Button onPress={handleSignOut} title="Sign Out" />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "green",
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
