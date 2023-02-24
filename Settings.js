import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from './firebase-config';


const Settings = ({navigation }) => {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {    
    const uem = user.email;
    setMail(uem);
    readData();
}
);
const readData = () => {
  
const myDoc= doc(db, 'users',mail);

  //snapshot method
    getDoc(myDoc).then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data().displayName);
        setMail(snapshot.data().email);
        setContact(snapshot.data().phoneNumber);
      }
      else{
        Alert.alert("No Data Found");
      }

    }).catch((error) => {
      console.error('Error adding document: ', error.message);
    })
  };


  return (
        <View style={styles.container} >
          <View style={styles.sec}>
          <TouchableOpacity onPress={() => navigation.navigate('Edit')}> 
          <Text style={{color: '#03045E', fontWeight: 'bold', textAlign: 'right', marginBottom:10}}>Edit Profile</Text>       
          </TouchableOpacity>
          <Text></Text>
            <View style={styles.prof}>
            <Image style={styles.tinyLogo} source={require('./assets/download.png')} /><Text style={{ fontWeight: 'bold', fontSize:18, marginLeft: 32,marginTop:15}}>{name}</Text>            
            </View>
            <View style={styles.prof}>
            <Image style={styles.tinyLogo} source={require('./assets/email.jpg')} /><Text style={{ fontWeight: 'bold', fontSize:18, marginLeft: 30,marginTop:15, width:235}}>{mail}</Text>

            </View>
            <View style={styles.prof}>
            <Image style={styles.tinyLogo} source={require('./assets/Contact.jpg')} /><Text style={{ fontWeight: 'bold', fontSize:18, marginLeft: 32,marginTop:15}}>{contact}</Text>

            </View>
            <Text></Text>
            <TouchableOpacity style={styles.button} 
                onPress={() => navigation.navigate('Changepass')}> 
              <Text
                style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
                Change Password
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} 
                onPress={() => navigation.navigate('Contact')}> 
              <Text
                style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
                Contact Us
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} 
                onPress={() => navigation.navigate('login')}> 
              <Text
                style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
                Logout
                </Text>
            </TouchableOpacity>
            </View>
        </View>
  )
}

export default Settings


const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#aaaaaa',
        
      },
      button: {
        marginTop: 20,
        backgroundColor: '#35414F',
        color: 'white',
        height: 40,
        padding: 10,
        width: '80%',
        borderRadius: 5,
        marginLeft: 35,
      },
      sec:{
        marginTop:50,
        borderTopStartRadius: 15,
        padding: 10,
        backgroundColor: 'white',
        borderRadius:15,
        alignContent:'center',
        marginLeft: 35,
        width: '80%',
        // flexDirection:'row',
        height:'65%'
      },   
      prof:{
        marginLeft: 30,
  
        textAlign: "center",
        flexDirection:'row',
  
      },
      tinyLogo: {
        
        width: 30,

        height: 30,
        marginTop:10,
      },

})