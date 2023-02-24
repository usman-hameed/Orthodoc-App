import {Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  
  Alert, } from 'react-native'
import React, { useState } from 'react'

import { doc, setDoc } from 'firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import { authentication } from './firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
// import { authentication } from './firebase/firebase-config';
// import {createUserWithEmailAndPassword } from "firebase/auth";

import logo from './assets/logo.png'; 
import { db } from './firebase-config';


const Signup = ({navigation}) => {
  const [signedIn, setSignedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [doct,setDoct] = useState(false);


  const handleSingnUp = async() => {
    if (name.length===0) {
      alert('Name Can not be Empty');
      return;
    }
    if (contact.length===0||contact.length<11) {
      alert('Enter Valid Contact Number');
      return;
    }
    createUserWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        console.log(re);
        sendEmailVerification();
        if(sendEmailVerification()){
          addData();
         Alert.alert("User Created Successfully!");
      }
      else{
        Alert.alert("Enter Valid Email");
      }

        
        
      })
      .catch((err) => {
        Alert.alert('Error:', err.message);
      });
  };


const addData = () => {


  const myDoc= doc(db, 'users',email);
  
  const docData = {
    "displayName": name,
    "email": email,
    "password": password,
    "phoneNumber": contact,
  };
  
  setDoc(myDoc, docData).then(() => {
    console.log('Document written with ID: ', myDoc.id);
  }).catch((error) => {
    console.error('Error adding document: ', error.message);
  })


  };

  return (
  
    <View style={styles.container}>
    <Image source={logo} style={{ width: 305, height: 100 }} /> 
      <View style={styles.body}>

      <Text style={styles.mainTxt}
        textAlign={'center'}
      >Create an Account</Text>
        <TextInput
          label="Full Name"
          style={styles.inputContainer}
          
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="Enter Your Full Name"
          inputStyle={styles.input}
          value={name}
          onChangeText={setName}>

          </TextInput>
        <TextInput
          label="Email"
          style={styles.inputContainer}
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="Email"
          inputStyle={styles.input}
          value={email}
          onChangeText={setEmail}
          >

          </TextInput>
        

        <TextInput
          label="Password"
          style={styles.inputContainer}
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="************"
          inputStyle={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          >

          </TextInput>
          <TextInput
          keyboardType="numeric"
          label="Contact"
          style={styles.inputContainer}
          labelStyle={styles.labelSection}
          inputContainerStyle={styles.inputContainer}
          placeholder="Enter Your Contact No."
          inputStyle={styles.input}
          value={contact}
          maxLength={11}
        
          onChangeText={setContact}>

          </TextInput>
        
        <View style={styles.bottomView}>
          <Text style={{marginLeft: 70, color: '#6B7280'}}>
            Every Information is securely stored.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSingnUp}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>
              Create Account
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 15,
            }}>
            <Text style={{color: '#6B7280'}}>I already have an account, </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('login')}>
              <Text
                style={{color: '#03045E', fontWeight: 'bold', fontSize: 14}}>
                Login
              </Text>

            </TouchableOpacity>


          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 10,

            }}>
            <TouchableOpacity onPress={() => navigation.navigate('DocSignup')}>
            <Text style={{color: '#6b6d80' , marginRight:7, textDecorationLine: 'underline'}}>Signup as Doctor </Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#35414F',
    paddingTop: 90,
  },
  body:{
    bottom: 0,
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingTop: 20,
    paddingLeft: 10,
    // paddingBottom: 30,
    marginTop: 60,
    
  },
  mainTxt: {
    color: '#303030',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 29,
    marginBottom: 20,
    marginLeft:40
  },
  labelSection: {
    marginTop: 20,
    marginRight: 35,
    paddingBottom: 10,
  },
  inputContainer: {
      backgroundColor: '#f2f2f2',
      borderTopStartRadius: 5,
      borderTopEndRadius: 5,
      borderRadius:10,
      height: 40,
      width: '75%',
      marginLeft: 30,
      marginBottom:5,
      padding:9,
  },
  input: {
    fontSize: 15,
    padding: 10,
  },
  bottomView: {
    marginTop: 20,
    paddingBottom: 30,
  },  signbut:{
    marginTop:-19,
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 29,
    marginBottom: 20,
    marginLeft:-11,

    flexDirection: 'row',
justifyContent:'flex-end',
    backgroundColor: 'white',
    width: 200,
    borderRadius: 5,
  },
  docbut:{
    marginTop:-19,
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 29,
    marginBottom: 20,
    marginRight:21,
    
    flexDirection: 'row',
justifyContent:'flex-end',
    backgroundColor: 'white',
    width: 100,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#35414F',
    color: 'white',
    height: 40,
    padding: 10,
    width: '80%',
    borderRadius: 5,
    marginLeft: 35,
  },
});

export default Signup