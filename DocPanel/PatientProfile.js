

import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { db, authentication } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";


const email = authentication.currentUser?.email;
export default function PatientProfile(props) {
  const [users, setUsers] = useState([]);
  const [mail,setMail] = useState(props.route.params.params.param1);
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (mail === doc.data().email) {
          setUsers((prev) => [...prev, doc.data()]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(users)

  if (!users) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.center}>
      {/* <Text>Email is {mail}</Text> */}
      <View style={{backgroundColor:"white", borderRadius:15, borderColor:"black", borderWidth:1, paddingHorizontal:10 }}>

      {users.map((item, key) => (       

            <View>
              <View style={styles.prof}>
                <Text style={{ fontWeight: 'bold', fontSize:18,marginTop:15}}>Patient's Name:</Text>
                <Text  style={{  fontSize:18, marginLeft: 25,marginTop:15}}>Mr. {item.displayName?? item.name} </Text>
              </View>
              <View style={styles.prof}>
                <Text style={{ fontWeight: 'bold', fontSize:18,marginTop:15}}>Patient's Contact:</Text>
                <Text  style={{  fontSize:15, marginLeft: 12,marginTop:15}}>0{item.phoneNumber} </Text>
              </View>
              <View style={styles.prof}>
                <Text style={{ fontWeight: 'bold', fontSize:18,marginTop:15}}>Patient's Email:</Text>
                <Text  style={{  fontSize:15, marginLeft: 12,marginTop:15}}>{item.email} </Text>
              </View>
              
              
              </View>
      )    )
      }
      <TouchableOpacity style={{    marginTop: 20, marginBottom:20,
    backgroundColor: '#35414F',
    color: 'white',
    height: 40,
    paddingVertical: 10,
    width: '65%',
    borderRadius: 10,
    paddingHorizontal:15,

    marginLeft: 85,}}


                onPress={() => props.navigation.navigate('Chat',{
                  params:{
                    docid: mail ,
                    userid:authentication.currentUser?.email ,
                    current:"patient"
                  }
                })}> 
              <Text
                style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
                  Send Message
                </Text>
            </TouchableOpacity>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor:"#f1f5f9"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },      
  prof:{

    marginLeft: 30,
    flexDirection:'row',

  },      
});