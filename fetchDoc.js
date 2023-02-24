import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { db, authentication } from "./firebase-config";
  // import { Firestore, getFirestore } from "firebase/firestore";
  // import { firebase } from "@firebase/app";
  import { firebase } from "./firebase-config";
  import "@firebase/firestore";
  import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
  import { Firestore, firestore } from "firebase/firestore";
  // import { firestore } from "@react-native-firebase/firestore";
  const email = authentication.currentUser?.email;
  export default function FetchDoc(props) {

    const [users, setUsers] = useState([]);
  
    const getCollection = async (colName, dataArray) => {
      const col = collection(db, colName);
      const citySnapshot = await getDocs(col);
      citySnapshot.docs.map((doc) => dataArray((item) => [...item, doc.data()]));
    };
  
    const getUsers = async () => {
      getCollection("doctors", setUsers);
    };
    useEffect(() => {
      getUsers();
    }, []);
  
    return (
      <View style={styles.message}>
        <View style={{}}>
          {users.map((user, index) => (
            <TouchableOpacity
              key={user.email}
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#9d9d9e",
                borderRadius: 5,
                margin: 10,
                height: 40,
              }}
              onPress={() => {
                props.navigation.navigate("Chat", {
                  params: {
                    docid: user.email,
                    userid: authentication.currentUser?.email,
                    current: "patient",
                  },
                });
              }}
            >
              <Text>{user.email}</Text>
              <Text>{user.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    message: {
      flex: 1,
      backgroundColor: "#aaaaaa",
    },
  });
  