import { sendPasswordResetEmail } from "firebase/auth";
import react, { useState } from "react";
import {
  Styles,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { authentication } from "./firebase-config";
import logo from "./assets/logo.png";

const forgotPassword = (Email) => {
  console.log("reset email sent to " + Email);
  sendPasswordResetEmail(authentication, Email, null)
    .then(() => {
      alert("reset email sent to " + Email);
    })
    .catch(function (e) {
      console.log(e);
      alert(e);
    });
};

const forgotPass = ({ navigation }) => {
  // <NavigationContainer>
  //   <Stack.Navigator>
  const [email, setEmail] = useState("");
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 100 }} />
      <View style={styles.login}>
        <Text style={styles.textStyle}>Email:</Text>
        <TextInput
          style={styles.inputStyle}
          marginTop={5}
          alignItems={"center"}
          placeholder=" Enter Email"
          value={email}
          onChangeText={setEmail}
        ></TextInput>

        <TouchableOpacity
          style={styles.button}
          onPress={() => forgotPassword(email)}

          //{handleSignin}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Reset Account
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 15,
          }}
        >
          <Text style={{ color: "black" }}>I don’t have an account, </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
            <Text style={{ color: "#03045E", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#35414F",
    paddingTop: 90,
  },

  textStyle: {
    marginLeft: 58,
    alignContent: "center",
    marginTop: 20,
  },
  passStyle: {
    marginLeft: 58,
    alignContent: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  inputStyle: {
    backgroundColor: "#f2f2f2",
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    // borderWidth:1,
    borderRadius: 10,
    padding: 5,
    height: 40,
    width: "70%",
    marginLeft: 50,
  },
  login: {
    bottom: 0,
    backgroundColor: "white",
    flex: 3,
    width: "100%",
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingTop: 20,
    paddingLeft: 10,
    paddingBottom: 30,
    marginTop: 60,
  },
  // passStyle:{
  //   borderWidth:2,
  //   borderColor:'#5F5454',
  //   width:"50%",
  // },

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
});
export default forgotPass;
