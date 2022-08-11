import Navigation from "./src/navigation/navigation";
import { NavigationContainer } from "@react-navigation/native";
import initfirebase from "./src/firebase/firebase";
import { UserProvider } from "./src/context/UserContext";
import Toast from "react-native-toast-message";
export default function App() {
  return (
    <>
      <NavigationContainer>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </NavigationContainer>

      <Toast />
    </>
  );
}
