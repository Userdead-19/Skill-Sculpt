import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Homescreen from "./screens/Homescreen";
import FriendsScreen from "./screens/Friendscreen";
import Chats from "./screens/Chats";
import Messages from "./screens/messages";
import Options from "./screens/Options";
import Questions from "./screens/Questions";
import QuestionDetailScreen from "./screens/QuestionDetailScreen";
import NewQuestionScreen from "./screens/NewQuestionScreen";
import CommentScreen from "./screens/CommentScreen";

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
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Chat" component={Chats} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Options" component={Options} />
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} />
        <Stack.Screen name="NewQuestion" component={NewQuestionScreen} />
        <Stack.Screen name="Comments" component={CommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknavigator;

const styles = StyleSheet.create({});
