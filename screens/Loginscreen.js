import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loginscreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   const checkloginstatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("authtoken");
  //       if (token) {
  //         navigation.replace("Home");
  //       } else {
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   checkloginstatus();
  // }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://backend-messenger.onrender.com/login", user)
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        console.log(token);
        AsyncStorage.setItem("authtoken", token);
        navigation.replace("Home");
      })
      .catch((err) => {
        Alert.alert("Login Failed", "Please check your credentials");
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Text
          style={{
            color: "blue",
            fontSize: 20,
            alignContent: "center",
            marginTop: 100,
            marginLeft: 70,
            fontWeight: "bold",
          }}
        >
          Sign in
        </Text>
        <Text style={{ marginTop: 20, fontSize: 19, alignContent: "center" }}>
          Sign in to your account
        </Text>
        <Text
          style={{
            marginTop: 50,
            color: "grey",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Email
        </Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          editable
          maxLength={40}
          style={{
            padding: 10,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
          }}
          keyboardType="email-address"
        />
        <Text
          style={{
            marginTop: 10,
            color: "grey",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Password
        </Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          editable
          maxLength={40}
          style={{
            padding: 10,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
          }}
          keyboardType="default"
          autoComplete="password"
          caretHidden={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ fontSize: 20, marginLeft: 70, marginTop: 10 }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, color: "grey" }}>
          Don't have an account?
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={{ marginTop: 10, color: "grey" }}> Sign up</Text>
          </TouchableOpacity>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    marginTop: 50,
    height: 50,
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
});
