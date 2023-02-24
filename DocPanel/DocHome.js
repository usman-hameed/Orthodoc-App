import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {SearchBar} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import App from './App';

const DocHome = ({navigation,route}) => {
    //const id=route.params.id;
  return (




    <View style={styles.container}>
            <Text style={{fontWeight:'bold', fontSize:23, marginLeft:100, marginTop:10}}>Welcome to OrthoDoc</Text>
      <Text style={{paddingTop:10}}>
        {/* {id} */}
        </Text>
      <View style={{padding:10}}>

      <TouchableOpacity onPress={()=>{navigation.navigate('SearchPatient')}}>
      <SearchBar
          placeholder="Search for a Patient"

          // value={search}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchBarInput}
          inputStyle={styles.searchBarInputText}
        />
        </TouchableOpacity>
        <TouchableOpacity
        style= {styles.appointment}
          onPress={() => {
            navigation.navigate("DocAppointment");

          }}
        >
          <Text  style= {styles.appText}>View Appointments </Text>
          
        </TouchableOpacity>


      </View>
    </View>
  )
}

export default DocHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  
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
})