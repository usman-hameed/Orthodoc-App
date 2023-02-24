import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase-config";
import { Input, Button } from "react-native-elements";
import { signOut } from "firebase/auth";

const Edit = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    setEmail(user.email);
  });

  const update = (value, merge) => {
    if (name.length == 0) {
      alert("Name can not be an Empty Field");
      return;
    } else if (contact.length == 0 || contact.length > 11) {
      alert("Please Enter a valid Contact Number");
      return;
    }
    const myDoc = doc(db, "users", email);
    setDoc(myDoc, value, { merge: merge })
      .then(() => {
        Alert.alert("Credentials Update Successfull", "Please Login Again");
        navigation.navigate("login");
      })
      .catch((error) => {
        console.error("Error adding document: ", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sec}>
        <Input
          style={{ borderRadius: 5 }}
          placeholder="Enter Name"
          label="Name"
          leftIcon={{ type: "material", name: "email" }}
          value={name}
          onChangeText={setName}
        />

        <Input
          style={{ borderRadius: 5 }}
          placeholder="Enter Contact Number"
          label="Contact"
          keyboardType="numeric"
          leftIcon={{ type: "material", name: "email" }}
          value={contact}
          onChangeText={setContact}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            update(
              {
                displayName: name,
                phoneNumber: contact,
              },
              true
            )
          }
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaaaaa",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#35414F",
    color: "white",
    height: 40,
    padding: 10,
    width: "80%",
    borderRadius: 5,
    marginLeft: 35,
  },
  sec: {
    marginTop: 50,
    borderTopStartRadius: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    alignContent: "center",
    marginLeft: 35,
    width: "80%",
    // flexDirection:'row',
    height: "65%",
  },
  prof: {
    marginLeft: 30,

    textAlign: "center",
    flexDirection: "row",
  },
  tinyLogo: {
    width: 30,

    height: 30,
    marginTop: 10,
    // paddingTop:30, backgroundColor:'white'
  },
});
export default Edit;
