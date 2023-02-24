import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Button } from "react-native";
import { db, authentication } from "./firebase-config";
import { collection, getDocs, query } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";



const email = authentication.currentUser?.email;

export default function DocProfile(props) {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [startTime,setStartTime]= useState("");
  const [endTime,setEndTime]= useState(""); 
  const [mail,setMail] = useState(props.route.params.params.param1);
  const [name,setName] = useState("");
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "doctors")));
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

  if (!users) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }
  console.log("Usre",users);

  return (
    <View style={styles.center}>
<View style={{backgroundColor:"white", borderRadius:15, borderColor:"black", borderWidth:1, paddingHorizontal:10 }}>
  <Text></Text>
      {console.log(users)}
      {users.map((item, key) => (

        item.address.map(
            (itm, k) => (
              
            <View>
              <View style={styles.prof}>
                <Text style={{ fontWeight: 'bold', fontSize:18,marginTop:15}}>Name: </Text>
                <Text  style={{  fontSize:18, marginLeft: 25,marginTop:15}} >Dr. {item.displayName?? item.name} </Text>
                {/* {setName(item.displayName?? item.name) } */}

              </View>
              <View style={styles.prof}>
                <Text style={{ fontWeight: 'bold', fontSize:18,marginTop:15}}>Email: </Text>
            <Text style={{  fontSize:18, marginLeft: 28,marginTop:15}}>{mail}</Text>

            </View>

              <View style={styles.prof}>
                <Text style={{ fontWeight: 'bold', fontSize:18,marginTop:15}}>Contact: </Text>
            <Text style={{  fontSize:18, marginLeft: 10,marginTop:15}}>{item.phoneNumber?? item.contact}</Text>
            
            </View>
            

            <View style={styles.prof}>
              <Text style={{ fontWeight: 'bold', fontSize:18,marginTop:15}}>Address: </Text>
            <Text style={{ maxWidth:250, fontSize:18, marginLeft: 7,marginTop:15}}> {itm[0].streetNumber}, {itm[0].street}, {itm[0].district}, {itm[0].city}, {itm[0].region}</Text>
            </View>
            
            <View style={styles.prof}>
            <Text style={{ fontWeight: 'bold', fontSize:18,marginTop:15}}>Clinic Timings: </Text>
            <Text style={{  fontSize:18, marginLeft: 8,marginTop:15}}>{item.startTime}</Text>

            <Text style={{  fontSize:18, marginLeft: 5,marginTop:15}}> To  {item.endTime}</Text>
            


            </View>
            </View>

  
            )
          )
      ))}
      <TouchableOpacity style={{    marginTop: 20,
    backgroundColor: '#35414F',
    color: 'white',
    height: 40,
    paddingVertical: 10,
    width: '65%',
    paddingHorizontal:15,
    borderRadius: 10,
    marginLeft: 95,}} 


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

            <TouchableOpacity style={{    marginTop: 20,
    backgroundColor: '#35414F',
    color: 'white',
    height: 40,
    paddingVertical: 10,
    width: '65%',
    borderRadius: 10,
    paddingHorizontal:15,

    marginLeft: 85,}} 

                onPress={() => props.navigation.navigate('Appointment',{
                  params:{
                    docid: mail,
                    userid:authentication.currentUser?.email,
                    startTime:users[0].startTime,
                    endTime: users[0].endTime,


                  }
                })}> 
                <Text
                style={{textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
                  Book Appointment
                </Text>
                </TouchableOpacity>
                <Text></Text>

                
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

    // marginLeft: 30,
    flexDirection:'row',
    backgroundColor:"white"

  },      
});