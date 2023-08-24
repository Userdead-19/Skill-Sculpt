import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const CreateBlog2 = ({ route }) => {
  const { title, designation, company } = route.params;
  const [content, setContent] = useState("");
  const navigation = useNavigation();
  const handleCreateBlog = async () => {
    const token = await AsyncStorage.getItem("authtoken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    if (!title || !content || !designation || !company) {
      Alert.alert("Please fill in all fields");
      return;
    }

    const newBlog = {
      title: title,
      content: content,
      userID: userId,
      designation: designation,
      company: company,
    };

    axios
      .post("https://backend-messenger.onrender.com/blogs", newBlog)
      .then((response) => {
        Alert.alert("New blog created successfully");
        navigation.goBack(); // Navigate back to previous screen
      })
      .catch((error) => {
        Alert.alert("Error creating blog");
        console.error("Error creating blog:", error);
      });
  };

  return (
    <View
      style={{
        alignContent: "center",
        marginTop: 10,
        width: 300,
        marginLeft: 30,
        flex: 1,
      }}
    >
      <TextInput
        value={content}
        onChangeText={(text) => setContent(text)}
        style={styles.input}
        placeholder="Content"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateBlog}>
        <Text style={styles.buttonText}>Create Blog</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBlog2;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    height: 300,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 150,
    marginLeft: 70,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
