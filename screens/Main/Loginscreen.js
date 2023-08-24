import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loginscreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authtoken");
        if (token) {
          navigation.replace("Options");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://backend-messenger.onrender.com/login", user)
      .then((res) => {
        const token = res.data.token;
        AsyncStorage.setItem("authtoken", token);
        navigation.replace("Options");
      })
      .catch((err) => {
        Alert.alert("Login Failed", "Please check your credentials");
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.content}>
        <View style={{ alignItems: "center", elevation: 10 }}>
          <Text style={styles.signInText}>Sign in</Text>
          <Text style={styles.subtitleText}>Sign in to your account</Text>
        </View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signupLink}> Sign up</Text>
          </TouchableOpacity>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8", // Background color
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  content: {
    width: "80%",
  },
  signInText: {
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 18,
    marginBottom: 30,
  },
  label: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  button: {
    height: 50,
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  signupText: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
  },
  signupLink: {
    color: "blue",
  },
});

export default Loginscreen;
