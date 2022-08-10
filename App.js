import Navigation from './src/navigation/navigation';
import { NavigationContainer } from '@react-navigation/native';
import initfirebase from "./src/firebase/firebase"
export default function App() {
  return (
    <NavigationContainer>
      <Navigation/>
    </NavigationContainer>
  );
}



