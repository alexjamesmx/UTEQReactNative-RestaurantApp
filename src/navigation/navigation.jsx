import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Restaurants from "../screens/restaurants";
import FontAwesome5 from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator();

export default function Navigation(){

    
    return(
        <Tab.Navigator
        screenOptions={{
            headerShown:false
            
        }}
        initialRouteName="Restaurants">
            <Tab.Screen
                name='Restaurants'
                component={Restaurants}
                options={{
                tabBarLabel:'',
                tabBarIcon:({color,size}) => (
                    <FontAwesome5 name='restaurant' color={color} size={size}/>
                ) 

                }}
            />


        </Tab.Navigator>
        


    ) 
}