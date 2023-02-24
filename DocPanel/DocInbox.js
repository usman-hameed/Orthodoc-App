import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, authentication } from "../firebase-config";
import { query, where } from "firebase/firestore";
import { async } from "@firebase/util";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DocInbox(props) {
  const [users, setusers] = useState([]);
  console.log("AUTH " + authentication.currentUser.email);
  if (!authentication.currentUser) {
    //handle if not login
    alert("Please Login First");
    navigation.navigate("login");
  }
  const mail = authentication.currentUser.email;
  const auth = getAuth();

  const querySnapshot = async () => {
    const col = collection(db, "chatroom");
    const q = query(
      col,
      where("sentBy", "==", authentication.currentUser?.email)
    );
    const q2 = query(
      col,
      where("sentTo", "==", authentication.currentUser?.email)
    );

    const snap = await getDocs(q);
    const snap3 = await getDocs(q2);

    let usersEmail = [];
    console.log("b4 snap 1");
    snap.forEach((doc) => {
      if (!usersEmail.find((email) => email == doc.data().sentTo)) {
        usersEmail.push(doc.data().sentTo);
      }
    });
    console.log("b4 snap 3");
    snap3.forEach((doc) => {
      if (!usersEmail.find((email) => email == doc.data().sentBy)) {
        // if (doc.data().sentTo != props.route.params.params.param1)
        usersEmail.push(doc.data().sentBy);
      }
    });
    console.log("After snap 3");

    usersEmail.map(async (email) => {
      const col2 = collection(db, "users");
      const q2 = query(col2, where("email", "==", email));
      const snap2 = await getDocs(q2);
      snap2.forEach((doc) => {
        setusers((user) => [...user, doc.data()]);
      });
    });
  };

  useEffect(() => {
    querySnapshot();
  }, []);

  return (
    <ScrollView>
      {users.map((user) => {
        return (
          <TouchableOpacity
            style={{
              height: 32,
              marginTop:5,
              backgroundColor: "#f1f5f9",
              borderRadius: 15,
              marginBottom: 3,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              height: 60,
              paddingHorizontal:60,
              borderWidth:1,
              borderColor:"black",
            }}
            key={user.email}
            onPress={() => {
              props.navigation.navigate("Chat", {
                params: {
                  docid: authentication.currentUser?.email,
                  userid: user.email,
                  current: "doctor",
                },
              });
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {user.name ?? user.displayName}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  yourmsg: {
    backgroundColor: "green",
  },
  othermsg: {
    backgroundColor: "red",
  },
});
