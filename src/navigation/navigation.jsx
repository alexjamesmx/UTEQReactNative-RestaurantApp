import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";
import Restaurants from "../screens/restaurants";
import Favorites from "../screens/favorites";
import Account from "../screens/account";
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Restaurants"
    >
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({color, size}) => (
            <Icon
              type="material-community"
              name="heart"
              color={color}
              size={40}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Restaurants"
        component={Restaurants}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({color, size}) => (
            <Icon
              type="material-community"
              name="silverware"
              color={color}
              size={40}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({color, size}) => (
            <Icon
              type="material-community"
              name="account"
              color={color}
              size={40}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
