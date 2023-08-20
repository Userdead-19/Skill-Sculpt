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
import RNPickerSelect from "react-native-picker-select";
import Picker from "../components/Picker";
import { ScrollView } from "react-native";

const Registerscreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [Gender, setGender] = useState();
  const [DOB, setDOB] = useState();
  const [YOG, setYOG] = useState();
  const [Branch, setBranch] = useState();
  const [College, setCollege] = useState();
  const [FOI, setFOI] = useState();
  const [Skills, setSkills] = useState();
  const [POW, setPOW] = useState();
  const [Designation, setDesignation] = useState();
  const [About, setAbout] = useState();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
      gender: Gender,
      dob: DOB,
      yearofgraduate: YOG,
      branch: Branch,
      college: College,
      fieldofintrest: FOI,
      skills: Skills,
      placeofwork: POW,
      desigination: Designation,
      about: About,
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
        setName("");
        setEmail("");
        setImage("");
        setPassword("");
        setGender("");
        setDOB("");
        setYOG("");
        setBranch("");
        setCollege("");
        setFOI("");
        setSkills("");
        setPOW("");
        setDesignation("");
        setAbout("");
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
    <ScrollView>
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
          <Text style={styles.text}>Name</Text>
          <TextInput
            placeholder="Enter your name"
            onChangeText={(text) => setName(text)}
            maxLength={40}
            style={styles.textinput}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            maxLength={40}
            style={styles.textinput}
            keyboardType="email-address"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            maxLength={40}
            style={styles.textinput}
            keyboardType="default"
            //caretHidden={true}
          />
          <Text style={styles.text}>Image Url</Text>
          <TextInput
            onChangeText={(text) => setImage(text)}
            editable
            maxLength={40}
            style={styles.textinput}
            keyboardType="default"
            placeholder="Enter your image url"
          />
          <Text style={styles.text}>Gender</Text>
          <TextInput
            placeholder="Enter your gender"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setGender(text)}
          />
          <Text style={styles.text}>Date of Birth</Text>
          <TextInput
            placeholder="Enter your date of birth in dd/mm/yyyy"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setDOB(text)}
          />
          <Text
            style={{
              marginTop: 10,
              color: "grey",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Year of Graduation
          </Text>
          <TextInput
            placeholder="Enter your year of graduation"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setYOG(text)}
          />
          <Text style={styles.text}>Branch</Text>
          <TextInput
            placeholder="Enter your branch"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setBranch(text)}
          />
          <Text style={styles.text}>College</Text>
          <TextInput
            placeholder="Enter your college name"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setCollege(text)}
          />
          <Text style={styles.text}>fieldofintrest</Text>
          <TextInput
            placeholder="Enter your field of intrest"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setFOI(text)}
          />
          <Text style={styles.text}>skills</Text>
          <TextInput
            placeholder="Enter your skills"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setSkills(text)}
          />
          <Text style={styles.text}>placeofwork</Text>
          <TextInput
            placeholder="Enter your place of work"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setPOW(text)}
          />
          <Text style={styles.text}>designation</Text>
          <TextInput
            placeholder="Enter your designation"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setDesignation(text)}
          />
          <Text style={styles.text}>about</Text>
          <TextInput
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
                marginLeft: 70,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
  textinput: {
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});
