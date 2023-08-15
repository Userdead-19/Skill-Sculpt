import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Homescreen from "./screens/Homescreen";

const Stack = createNativeStackNavigator();

const Stacknavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Loginscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Registerscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Homescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknavigator;

const styles = StyleSheet.create({});
