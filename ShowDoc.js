import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Pressable} from "react-native";
import { db } from "./firebase-config";
import { firebase } from "@react-native-firebase/firestore";
import { QuerySnapshot } from "firebase/firestore";

// import { async } from "@firebase/util";

const ShowDoc = () => {

    const [users, setUsers]= useState([]);
    const todoref = firebase.firestore().collection('doctors');
useEffect( async ()=>{
    todoref.onSnapshot(
        QuerySnapshot=>{
            const users= [];
            QuerySnapshot.forEach((doc)=>{
                const {name, email}=doc.data()
                users.push({
                    name,
                    email,
                })
            })
            setUsers(users)
        }
    )

},[])

  return (
    <View style={styles.center}>
        <FlatList
        style={{height:'100%'}}
        data = {users}
        numColumns={1}
        renderItem={({item})=>(
            <Pressable>
                <View>
                    <Text>{item.name}</Text>    
                    <Text>{item.email}</Text>   
                </View>               
            </Pressable>
        )} 
        />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop:100,

  },
});

export default ShowDoc;