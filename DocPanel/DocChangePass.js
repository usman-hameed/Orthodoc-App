import { StyleSheet, Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import React, { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { db } from '../firebase-config';
import {Input, Button} from 'react-native-elements';
const DocChangePass = ({navigation }) => {
  const [email, setEmail] = useState("");
  const [current, setCurrent] = useState("");
  const [pass, setPass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirm, setConfirm] = useState("");

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    
     setEmail( user.email);
     readData();

}
);
const readData = () => {
  
const myDoc= doc(db, 'doctors',email);

//   //snapshot method
    getDoc(myDoc).then((snapshot) => {
      if(snapshot.exists){
        setCurrent(snapshot.data().password);

      }
      else{
        Alert.alert("No Data Found");
      }

    }).catch((error) => {
      console.error('Error adding document: ', error.message);
    })
  };
  
  const update=(value, merge) =>{
    const myDoc= doc(db, 'users',email);
    if(current===pass){
        if(newpass.length>5){
            if(newpass===confirm){
                setDoc(myDoc,value,{merge:merge}).then(() => {
                    // alert("Password Update Successfull");
                    const auth = getAuth();
                    onAuthStateChanged(auth, (user) => {
                        updatePassword(user, newpass).then(() => {
                        navigation.goBack();
                        alert("Password Update Successfull");
                        
                    }).catch((error) => {
                    
                        alert("Error "+error);

                    });

                  }).catch((error) => {
                    console.error('Error adding document: ', error.message);
                  })
                }
                );
            }
            else{
                alert("Password Mismatch");
                setPass("");
                setNewpass("");
                setConfirm("");
            }
        }
        else{
            alert("Password is too short");
            setPass("");
            setNewpass("");
            setConfirm("");
        }
    }
    
    else{
        alert("Current Password is Incorrect");
        setPass("");
        setNewpass("");
        setConfirm("");
    }
    
  }

  return (
    
        <View style={styles.container} >
          <View style={styles.sec}>
            <Input 
                style={{borderRadius:5}}
                placeholder='Enter Current Password'
                label='Current Password'
                leftIcon={{ type: 'material', name: 'email' }}
                value={pass}
                onChangeText={setPass}
                secureTextEntry={true}
                />

            <Input 
                style={{borderRadius:5}}
                placeholder='Enter New Password'
                label='New Password'
                leftIcon={{ type: 'material', name: 'email' }}
                value={newpass}
                onChangeText={setNewpass}
                secureTextEntry={true}
                />
                <Input 
                style={{borderRadius:5}}
                placeholder='Confirm New Password'
                label='Confirm Password'
                leftIcon={{ type: 'material', name: 'email' }}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} 
                onPress={() => update({
                    "password":newpass
                },true)}> 
              <Text
                style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
                Update Password
                </Text>
            </TouchableOpacity>
            </View>
        </View>
  )
}
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
export default DocChangePass