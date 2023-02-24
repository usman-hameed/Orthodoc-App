import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import ShowDoc from './Showdoc';
import { SearchBar } from "react-native-elements";

const Home = ({ navigation }) => {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  // const [contact, setContact] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uname = user.displayName;
      const uem = user.email;
      // const ucont = user.contact;

      setMail(uem);
      setName(uname);
      // Alert.alert("User is"+user.name);
      setContact(ucont);

      // ...
    } else {
      Alert.alert("User Error");
      // User is signed out
      // ...
    }
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 23,
          marginLeft: 100,
          marginTop: 15,
        }}
      >
        Welcome to OrthoDoc
      </Text>
      {/* <Text>Name is {name}</Text> */}
      <Text style={{ height: 20 }}></Text>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("searchDoc");
          }}
        >
          <SearchBar
          placeholder="Search for Doctor"
          
          // value={search}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchBarInput}
          inputStyle={styles.searchBarInputText}
        />
        </TouchableOpacity>
        
        <TouchableOpacity
        style= {styles.appointment}
          onPress={() => {
            navigation.navigate("ViewPatAppointments");
          }}
        >
          <Text  style= {styles.appText}>View Appointments </Text>
        </TouchableOpacity>

        {/* <Button title='Search Patient ' borderRadius={10} color='#35414F' onPress={()=>{navigation.navigate('Chat')}}/> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  
  searchBar: {
    backgroundColor: "#f1f5f9",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderColor:"black",
    borderWidth:2,
  },
  searchContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarInput: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
   
  },
  appointment:{
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:10,
    marginTop:120,
    borderRadius:20,
    height:"28%",
    width:370,
    flexDirection:'row'
  },
  appText:{
    fontSize:18,
    fontWeight:"bold"


  }
});
