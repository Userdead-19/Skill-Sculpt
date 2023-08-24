import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from "react-native";

const EditUserInfoScreen = ({ route, navigation }) => {
  console.log("route params ", route.params);
  const { userInfo } = route.params;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [gender, setGender] = useState(userInfo.gender);
  const [dob, setDob] = useState(userInfo.dob);
  const [yearofgraduate, setYearofgraduate] = useState(userInfo.yearofgraduate);
  const [branch, setBranch] = useState(userInfo.branch);
  const [college, setCollege] = useState(userInfo.college);
  const [fieldofinterest, setFieldofinterest] = useState(
    userInfo.fieldofinterest
  );
  const [skills, setSkills] = useState(userInfo.skills);
  const [placeofwork, setPlaceofwork] = useState(userInfo.placeofwork);
  const [designation, setDesignation] = useState(userInfo.designation);
  const [about, setAbout] = useState(userInfo.about);
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = () => {
    const Updateuser = async () => {
      setLoading(true);
      const updatedUser = {
        name: name,
        email: email,
        password: userInfo.password,
        image: userInfo.image,
        gender: gender,
        dob: dob,
        yearofgraduate: yearofgraduate,
        branch: branch,
        college: college,
        fieldofinterest: fieldofinterest,
        skills: skills,
        placeofwork: placeofwork,
        designation: designation,
        about: about,
      };
      axios
        .put(
          `https://backend-messenger.onrender.com/userUpdate/${userInfo._id}`,
          updatedUser
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
          Alert.alert(
            "User Updated Successfully",
            "Changes will be reflected after you login again"
          );
          navigation.goBack();
        })
        .catch((err) => {
          console.log("Registeration faied", err);
        });
    };
    Updateuser();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Profile",
      headerRight: () => <Button title="Save" onPress={handleSaveChanges} />,
    });
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.userImage} source={{ uri: userInfo.image }} />

        <View style={styles.title}>
          <Text style={styles.Text}>Edit User Information</Text>
        </View>
        <View style={styles.main}>
          <Text style={{ marginTop: 10 }}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name"
            style={styles.input}
          />
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            style={styles.input}
          />
          <Text>Gender</Text>
          <TextInput
            value={gender}
            onChangeText={(text) => setGender(text)}
            placeholder="Enter your Gender"
            style={styles.input}
          />
          <Text>Date of Birth</Text>

          <TextInput
            value={dob}
            onChangeText={(text) => setDob(text)}
            placeholder="Enter your Date of Birth"
            style={styles.input}
          />
          <Text>Year of Graduation</Text>

          <TextInput
            value={yearofgraduate}
            onChangeText={(text) => setYearofgraduate(text)}
            placeholder="Enter your Year of Graduation"
            style={styles.input}
          />
          <Text>Branch</Text>
          <TextInput
            value={branch}
            onChangeText={(text) => setBranch(text)}
            placeholder="Enter your Branch"
            style={styles.input}
          />
          <Text>College</Text>
          <TextInput
            value={college}
            onChangeText={(text) => setCollege(text)}
            placeholder="Enter your College"
            style={styles.input}
          />
          <Text>Field of Interest</Text>
          <TextInput
            value={fieldofinterest}
            onChangeText={(text) => setFieldofinterest(text)}
            placeholder="Enter your Field of Interest"
            style={styles.input}
          />
          <Text>Skills</Text>
          <TextInput
            value={skills}
            onChangeText={(text) => setSkills(text)}
            placeholder="Enter your Skills"
            style={styles.input}
          />
          <Text>Place of Work</Text>
          <TextInput
            value={placeofwork}
            onChangeText={(text) => setPlaceofwork(text)}
            placeholder="Enter your Place of Work"
            style={styles.input}
          />
          <Text>Designation</Text>
          <TextInput
            value="Designation"
            onChangeText={(text) => setDesignation(text)}
            placeholder="Enter your Designation"
            style={styles.input}
          />
          <Text>About</Text>
          <TextInput
            value={about}
            onChangeText={(text) => setAbout(text)}
            placeholder="Enter About Yourself"
            style={styles.input}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
  },
  title: {
    alignContent: "center",
    alignItems: "center",
  },
  main: {
    alignContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    //add shadow to text
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default EditUserInfoScreen;
