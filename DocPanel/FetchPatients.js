import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { db, authentication } from "../firebase-config";

  import { firebase } from "../firebase-config";
  import "@firebase/firestore";
  import { collection, doc, getDocs, query } from "firebase/firestore";
  import { Firestore, firestore } from "firebase/firestore";

  const email = authentication.currentUser?.email;
  export default function FetchPatients(props) {
    const [users, setUsers] = useState([]);
    const [mail, setMail] = useState("");


    const getCollection = async (colName, dataArray) => {
      const col = collection(db, colName);
      const citySnapshot = await getDocs(col);
      citySnapshot.docs.map((doc) => dataArray((item) => [...item, doc.data()]));
    };
  
    const getUsers = async () => {
      getCollection("users", setUsers);

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
                console.log(authentication.currentUser?.email)
                props.navigation.navigate("Chat", {
                  params: {
                    docid: authentication.currentUser?.email,
                    userid: user.email,
                    current: "doctor",
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
  }




  );


  