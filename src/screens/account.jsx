import {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/firebase";
import {SafeAreaView} from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import UserInfo from "../components/account/userInfo";
import Login from "../components/account/login";
import LoadingModal from "../utils/loadingModal";
import { appcolor } from "../constatns/appcolor";

export default function Account() {
  
const styles = StyleSheet.create({
  content:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: appcolor.background,
  }
})
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(user ? true : false);
    });
  }, [auth]);

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.content}>
        <Login />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.content}>
      <UserInfo setLoading={setLoading} />
      <LoadingModal show={loading} />
    </SafeAreaView>
  );
}

