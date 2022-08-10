import {useState, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/firebase";
import {SafeAreaView} from "react-native-safe-area-context";

import UserInfo from "../components/account/userInfo";
import Login from "../components/account/login";
import LoadingModal from "../utils/loadingModal";

export default function Account() {
  
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
      <SafeAreaView>
        <Login />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <UserInfo setLoading={setLoading} />
      <LoadingModal show={loading} />
    </SafeAreaView>
  );
}
