import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Register2 = ({ route }) => {
  const { name, email, password, confirmpassword } = route.params;
  const [image, setImage] = useState();
  const [gender, setGender] = useState();
  const [dob, setDOB] = useState();
  const [YOG, setYOG] = useState();
  const [Designation, setDesignation] = useState();
  const [branch, setBranch] = useState();
  const [college, setCollege] = useState();
  const [placeofwork, setPlaceofwork] = useState();
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={styles.text}>Image Url</Text>
          <TextInput
            value={image}
            onChangeText={(text) => setImage(text)}
            editable
            maxLength={40}
            style={styles.textinput}
            keyboardType="default"
            placeholder="Enter your image url"
          />
          <Text style={styles.text}>Gender</Text>
          <TextInput
            value={gender}
            placeholder="Enter your gender"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setGender(text)}
          />
          <Text style={styles.text}>Date of Birth</Text>
          <TextInput
            value={dob}
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
            value={YOG}
            placeholder="Enter your year of graduation"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setYOG(text)}
          />
          <Text style={styles.text}>Designation</Text>
          <TextInput
            value={Designation}
            placeholder="Enter your designation (if student enter 'NIL')"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setDesignation(text)}
          />
          <Text style={styles.text}>Branch</Text>
          <TextInput
            value={branch}
            placeholder="Enter your branch"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setBranch(text)}
          />
          <Text style={styles.text}>College</Text>
          <TextInput
            value={college}
            placeholder="Enter your college name"
            style={styles.textinput}
            keyboardType="default"
            onChangeText={(text) => setCollege(text)}
          />
          <Text style={styles.text}>Place of Work</Text>
          <TextInput
            style={styles.textinput}
            value={placeofwork}
            placeholder="Enter your place of work"
            keyboardType="default"
            onChangeText={(text) => setPlaceofwork(text)}
          />
          <Button
            icon="chevron-right"
            mode="contained"
            onPress={() => {
              console.log(
                gender,
                dob,
                YOG,
                Designation,
                branch,
                college,
                placeofwork
              );

              navigation.navigate("Register3", {
                name: name,
                email: email,
                password: password,
                confirmpassword: confirmpassword,
                image: image,
                gender: gender,
                dob: dob,
                yearofgraduate: YOG,
                branch: branch,
                college: college,
                placeofwork: placeofwork,
                designation: Designation,
              });
            }}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Next
          </Button>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default Register2;

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

    marginBottom: 50,
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
  },
});
