import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,

} from "react-native";
import { db } from "./firebase-config";
import { ContactStackNavigator } from "./Navigation/stackNavigator";
// import { auth, db } from "./firebase-config";
// import * as firebase from "firebase";

import { authentication } from "./firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

import logo from "./assets/logo.png";
import { collection, getDocs } from "firebase/firestore";

var Doctors = [];
var Users = [];
const Login = ({ navigation }) => {
  // <NavigationContainer>
  //   <Stack.Navigator>
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Data, setData] = useState("");
  const [Doc, setDoc] = useState("");
  // const mail = JSON.stringify(email);
  useEffect(() => {
    const querySnapshot = getDocs(collection(db, "doctors")).then(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log("Docsss", doc.id, " => ", doc.data());
          Doctors.push(doc.data().email);
          setData(Doctors);
          // Alert.alert("LoggedIn as Doctor");
          setDoc("True");
        });
      }
    );
  }, []);
  useEffect(() => {
    const querySnapshota = getDocs(collection(db, "users")).then(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log("Usersss", doc.id, " => ", doc.data());
          Users.push(doc.id);
          // setPatient(Users);
          // Alert.alert("LoggedIn as Doctor");
          setDoc("False");

        });
      }
    );
  }, []);

  const handleSignIn = () => {
    // Settings({params: { param1: email}});
    if (Doctors.includes(email)) {
      // navigation.navigate('Home')
      Alert.alert("LoggedIn as Doctor");
      signInWithEmailAndPassword(authentication, email, password)
        .then((re) => {
          // Alert("LoggedIn as Doctorrrrrr");
          navigation.navigate(
            "DocHome",
            {
              screen: "DocHome",
              params: { param1: email },
            }
            // {
            //   Screen:'Home',
            //   params: { message: email }
            // }
          );
          setEmail("");
          setPassword("");
        })

        .catch((err) => {
          Alert.alert("Error:", err.message);
          console.log(err);
        });
    } else if (Users.includes(email)) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((re) => {
          Alert.alert("LoggedIn as Patient");
          navigation.navigate(
            "Home",
            {
              screen: "Home",
              params: { param1: email },
            }
            // {
            //   Screen:'Home',
            //   params: { message: email }
            // }
          );
          // {mail: email})
          // setEmail("");
          // setPassword("");
        })

        .catch((err) => {
          Alert.alert("Error:", err.message);
          console.log(err);
        });
    } else {
      Alert.alert("Invalid Email", "Please check your Email again");
    }
  };
  if (Doc == "True") {
    return <ContactStackNavigator />;
  }

  return (

      <View style={styles.container}>
        <Image source={logo} style={{ width: 305, height: 100 }} />
        <View style={styles.login}>
          <Text style={styles.textStyle}>Email:</Text>
          {/* <Text>{mail}</Text> */}
          <TextInput
            style={styles.inputStyle}
            marginTop={5}
            alignItems={"center"}
            placeholder=" Enter Email"
            value={email}
            onChangeText={setEmail}
          ></TextInput>

          <Text style={styles.passStyle}>Password:</Text>

          <TextInput
            style={styles.inputStyle}
            placeholder=" Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          ></TextInput>

          {/* <FaHome color='red'/> */}

          <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
            <Text
              style={{
                textAlign: "right",

                color: "grey",
                fontWeight: "bold",
                paddingRight: 65,
                marginTop:10,
                fontSize: 14,
                textDecorationLine:'underline',


              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSignIn();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Login
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
    padding: 8,
    height: 40,
    width: "70%",
    marginLeft: 50,
    paddingRight:10,
    paddingLeft:14
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
    width: "70%",
    borderRadius: 5,
    marginLeft: 50,
  },
});
export default Login;
