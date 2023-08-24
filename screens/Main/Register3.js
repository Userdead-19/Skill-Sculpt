import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Register3 = ({ route }) => {
  console.log(route.params);
  const {
    name,
    email,
    password,
    image,
    gender,
    dob,
    yearofgraduate,
    branch,
    college,
    placeofwork,
    designation,
  } = route.params;
  const [FOI, setFOI] = useState("");
  const [Skills, setSkills] = useState("");

  const [About, setAbout] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (image == null) {
      image =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXm5uampqajo6Pa2trp6emhoaHl5eXg4OCoqKjc3Nzf39/W1tatra2wsLDIyMi8vLy2trbExMTOzs61tbXhv6YVAAAEl0lEQVR4nO2d27aqMAxFpYSbioL+/79uEPEGW4WmSepY8+287Tlikza0OZsNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKUMcmL4ptUeTDP36JTqc6ted9mTiXOZeU+3N7qja/YtnZHZqyF3ukUy2bQ2ep/ed5Q9tD7V7s7pauPmzjdqS0SebtbpZJk8brSOn5n+g9R/IcqSNVdfZRbyCrq/gcKW+/iN89jm0emSPt9t/7XRz3u6gUqV3md3Fs41Gk/LxcsFM8x/JLpapcI9gplnEkHNqt0huIYTHSbl0Ar2G0r0ipj2CnaL36U+Un2CkaX4tF6SmYJGWhLfGW2jeEXRBrbYk30NFfsFM8mv2d0u7brfZ7MrMJNWfx68m1Vebh+Y32GP2d+pX6F0Wbv9OaTTBJLOZTOvGkmYHsZDCIe0bBJNlr60zgqhQj9ioGca7CntqaYcUbwi6IlbbSM3y1cMRaTcz9zxSvlLY2NozVfsTttKUeWdM9/Ghoq7vInUl7TO1rtgEEk2SrrXWHc9N9x9L2mw5BDA+GDNmr4cXQUkUMkWhMpZoA9b7HUM0vgggmiZ3OqXejex5nZ/Pt+a3iX8NUW+xGyn10Gsjs7EyZz/cwVOD31+Hv59IwRwtLh4vf39PkvN3gkb0dQ2qCnC0aO2eLEG0aW40aOgUxtPR1Jki5MFQsAqUaQ4kmTBvDVBMjyEI0tQzDnPLtnPB7qGEXNFQNL7AfoAwdnQaIe2taGgshe9vbUsP7Ct+VrwFLxXCAd29qaU96g+Hy7B2T12g5V6LBVXiBb3Nq70bUBWJrDGdWL+xzJRuTaeYKw0V241fZedqKdpqIUziuLFi6oDCD/z1ak3dnH6HWTzEznGWu+CVUy2n0hk8UI4hgDx3WKmZGN2sTaPdhkMI8LooXpANUrCj9ri6iEexZnG9cq/0nL2ThyIHYBg700JJPbq6JbhoPbdtFj/Jd2UY1qIbS44KxH1dHd7R6KpxAabPYb3CMYxgPFev8ro7mKwblbea1L82MD6pZPJZmxtFy3aCc6bW61TBSunJqy0SxtJlxfr4jnB9Z3wE31r7MUOGdYp5xe1t1g20JPiiaWoyUMusN2FEM87DLUOc0lKAZxXCCRhSpCubXY2BqFOvH7Sn6n7tzlg9q/+Nq5dIf5m3lk6LuFcX17e3vUW2E+8+f+wbNGXWBXiG8ondZOMwV/Sl6n9wCPeiaUdR64iXzG+3RuUEUZszAPDpn/kJOsFNU2NqEr/VPhgp1X6QUPiiKP6CRDaFGEIVDKB9E6RDKBzHUJIx3iKZTyVo4IlsT2d+PfIPoG5NAgzDekwnuTuXzTI9krgn0/v4Tgu/zA3ZI3yE3Z1DnRyr5MxVqXkwRa2eI79hGpHZuYeYLfGUodMtdaxkKLkStZSjWr9HYdY/I7L7FmohTZNqKeolGKtVIdbpnDUW633qpVCqZss+XX4LILHqV0++IyCmYe7TAMiR2pqLd/FdEuvu/b7jV6NGMZBJvhH/fkP3/6lhkKHFC3GZOD5EY5qkm1i5HAwAAAAAAAAAAAAAAAAAAAACAJf4AKkJE8O36wbkAAAAASUVORK5CYII=";
    }

    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
      gender: gender,
      dob: dob,
      yearofgraduate: yearofgraduate,
      branch: branch,
      college: college,
      fieldofinterest: FOI,
      skills: Skills,
      placeofwork: placeofwork,
      designation: designation,
      about: About,
    };
    console.log(user);
    console.log("making api call");

    axios
      .post("https://backend-messenger.onrender.com/register", user)
      .then((res) => {
        console.log(res);
        Alert.alert(
          "Registeration success...!",
          "you have registered successfully"
        );
        setFOI("");
        setSkills("");

        setAbout("");
        navigation.replace("Login");
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
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.text}>Field of Intrest</Text>
          <TextInput
            value={FOI}
            placeholder="Enter your field of intrest"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setFOI(text)}
          />
          <Text style={styles.text}>Skills</Text>
          <TextInput
            value={Skills}
            placeholder="Enter your skills"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setSkills(text)}
          />
          <Text style={styles.text}>About</Text>
          <TextInput
            value={About}
            placeholder="Enter about yourself"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setAbout(text)}
          />
          <Text style={{ marginTop: 10, color: "grey" }}>
            By clicking register you agree to our terms and conditions
          </Text>
          <Text style={{ marginTop: 10, color: "grey" }}>
            and privacy policy
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 100,
                marginTop: 10,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Register3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 100,
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
    marginTop: 10,
  },
});
