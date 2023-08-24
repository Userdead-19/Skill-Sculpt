import React, { useState } from "react";
import { Alert } from "react-native";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CreateNewBlogScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
        placeholder="Enter Title"
      />

      <Text style={styles.label}>Designation</Text>
      <TextInput
        value={designation}
        onChangeText={(text) => setDesignation(text)}
        style={styles.input}
        placeholder="Your Designation"
      />

      <Text style={styles.label}>Company</Text>
      <TextInput
        value={company}
        onChangeText={(text) => setCompany(text)}
        style={styles.input}
        placeholder="Your Company"
      />

      <Button
        icon="chevron-right"
        mode="contained"
        onPress={() => {
          if (title || designation || company) {
            navigation.navigate("CreateBlog2", {
              title: title,
              designation: designation,
              company: company,
            });
          } else {
            Alert.alert("Please fill in all fields");
          }
        }}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "lightblue",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CreateNewBlogScreen;
