import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Loginscreen from "./screens/Main/Loginscreen";
import Registerscreen from "./screens/Main/Registerscreen";
import Homescreen from "./screens/Main/Homescreen";
import FriendsScreen from "./screens/CHATS/Friendscreen";
import Chats from "./screens/CHATS/Chats";
import Messages from "./screens/CHATS/messages";
import Options from "./screens/Main/Options";
import Questions from "./screens/Questions/Questions";
import QuestionDetailScreen from "./screens/Questions/QuestionDetailScreen";
import NewQuestionScreen from "./screens/Questions/NewQuestionScreen";
import CommentScreen from "./screens/Blogs/CommentScreen";
import BlogListScreen from "./screens/Blogs/BlogListScreen";
import CreateBlogScreen from "./screens/Blogs/CreateBlogScreen1";
import BlogDetailScreen from "./screens/Blogs/DetailedBlog";
import UserDetailsScreen from "./screens/Main/UserDetails";
import ReviewsScreen from "./screens/Review/ReviewsPage";
import AddReviewScreen from "./screens/Review/addReview";
import CreateBlog2 from "./screens/Blogs/CreateBlog2";
import Register2 from "./screens/Main/Register2";
import Register3 from "./screens/Main/Register3";

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
        <Stack.Screen name="Register" component={Registerscreen} />
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="Chat" component={Chats} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Options" component={Options} />
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="QuestionDetail" component={QuestionDetailScreen} />
        <Stack.Screen name="NewQuestion" component={NewQuestionScreen} />
        <Stack.Screen name="Comments" component={CommentScreen} />
        <Stack.Screen name="Blogs" component={BlogListScreen} />
        <Stack.Screen name="CreateBlog" component={CreateBlogScreen} />
        <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
        <Stack.Screen name="Userinfo" component={UserDetailsScreen} />
        <Stack.Screen name="Review" component={ReviewsScreen} />
        <Stack.Screen name="AddReview" component={AddReviewScreen} />
        <Stack.Screen name="CreateBlog2" component={CreateBlog2} />
        <Stack.Screen name="Register2" component={Register2} />
        <Stack.Screen
          name="Register3"
          component={Register3}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknavigator;

const styles = StyleSheet.create({});
