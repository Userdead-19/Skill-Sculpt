import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { TextInput, IconButton } from "react-native-paper";

const Registerscreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            color: "blue",
            fontSize: 20,
            alignContent: "center",
            marginTop: 20,
            marginRight: 10,
            fontWeight: "bold",
          }}
        >
          Sign up
        </Text>
        <Text style={{ marginTop: 20, fontSize: 19, alignContent: "center" }}>
          please fill the details
        </Text>
        <KeyboardAvoidingView>
          <Text style={styles.text}>Name</Text>
          <TextInput
            value={name}
            placeholder="Enter your name"
            onChangeText={(text) => setName(text)}
            maxLength={40}
            style={styles.textinput}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            value={email}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            maxLength={40}
            style={styles.textinput}
            keyboardType="email-address"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={password}
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            maxLength={40}
            style={styles.textinput}
            keyboardType="default"
            caretHidden={true}
          />
          <Text style={styles.text}>Confirm Password</Text>
          <TextInput
            value={confirmpassword}
            placeholder="Enter your password again"
            onChangeText={(text) => setconfirmpassword(text)}
            maxLength={40}
            style={styles.textinput}
            keyboardType="default"
            //caretHidden={true}
            secureTextEntry={true} // Make sure the input is a password field
            right={
              <IconButton
                icon="eye"
                onPress={() => {
                  // Toggle the password visibility
                  setPasswordVisible(!passwordVisible);
                }}
                color={passwordVisible ? "gray" : "blue"}
              />
            }
          />
          <Button
            icon="chevron-right"
            mode="contained"
            onPress={() => {
              if (password === confirmpassword) {
                navigation.navigate("Register2", {
                  name: name,
                  email: email,
                  password: password,
                  confirmpassword: confirmpassword,
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

          <Text style={{ marginTop: 10, color: "grey" }}>
            Already have an account?
          </Text>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Registerscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    marginTop: 50,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
  textinput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    width: 300,
  },
});
