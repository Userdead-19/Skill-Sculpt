import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const Registerscreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    console.log("making api call");

    axios
      .post("https://backend-messenger.onrender.com/register", user)
      .then((res) => {
        console.log(res);
        Alert.alert(
          "Registeration success...!",
          "you have registered successfully"
        );
        setName(" ");
        setEmail(" ");
        setImage(" ");
        setPassword(" ");
      })
      .catch((err) => {
        Alert.alert(
          "Registeration Failed ....:(",
          "there is an error in the registeration please check the details again"
        );
        console.log("Registeration faied", err);
      });
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "blue",
          fontSize: 20,
          alignContent: "center",
          marginTop: 100,
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
        <Text
          style={{
            marginTop: 50,
            color: "grey",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Name
        </Text>
        <TextInput
          value={name}
          editable
          onChangeText={(text) => setName(text)}
          maxLength={40}
          style={{
            padding: 10,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
          }}
        />
        <Text
          style={{
            marginTop: 10,
            color: "grey",
            fontWeight: "bold",
            fontSize: 16,
            width: 200,
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
        <Text
          style={{
            marginTop: 10,
            color: "grey",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Image Url
        </Text>
        <TextInput
          value={image}
          onChangeText={(text) => setImage(text)}
          editable
          maxLength={40}
          style={{
            padding: 10,
            borderBottomColor: "grey",
            borderBottomWidth: 1,
          }}
          keyboardType="default"
        />
        <Text style={{ marginTop: 10, color: "grey" }}>
          By clicking register you agree to our terms and conditions
        </Text>
        <Text style={{ marginTop: 10, color: "grey" }}>and privacy policy</Text>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={{ fontSize: 20, marginLeft: 70, marginTop: 10 }}>
            Register
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, color: "grey" }}>
          Already have an account?
        </Text>
      </KeyboardAvoidingView>
    </View>
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
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
});
