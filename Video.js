import { StyleSheet, Text, View, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import YoutubePlayer from 'react-native-youtube-iframe';


const Video = ({navigation}) => {
  return (
    <ScrollView>
        <View style={styles.container}>
          <View
          style={styles.box}
          >

            <Text style={styles.txt}>Situps</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Situps')} >
            <Image style={styles.Logo} source={require('./assets/sitstand.jpeg')} /></TouchableOpacity>
          </View>
          <Text style={{width:10}}></Text>
        <View style={styles.box}>
        <Text style={styles.txt}>Squats</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Squats')}>
            <Image style={styles.Logo} source={require('./assets/Squats.png')} /></TouchableOpacity>
        </View>

          

        </View>
        
        <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.txt}>Bicycle Crunches</Text>
        {/* <Image style={styles.Logo} source={require('./assets/Bicycle Crunches.png')} /> */}
        <TouchableOpacity onPress={() => navigation.navigate('BicycleCrunches')}>
                <Image style={styles.Logo} source={require('./assets/bicyclecrunch.png')} /></TouchableOpacity>

        </View>
        <Text style={{width:10}}></Text>
                <View style={styles.box}>
                <Text style={styles.txt}>Burpees</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Burpees')}>
                <Image style={styles.Logo} source={require('./assets/burpee.png')} /></TouchableOpacity>
                </View>

        </View>
        <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.txt}>Box Jumps</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BoxJump')}>
                <Image style={styles.Logo} source={require('./assets/boxjump.png')} /></TouchableOpacity>
        </View>
        <Text style={{width:10}}></Text>
                <View style={styles.box}>
                <Text style={styles.txt}>Cross Jump Rotations</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CrossJumpsRot')}>
                <Image style={styles.Logo} source={require('./assets/crossjumpR.png')} /></TouchableOpacity>
                </View>

        </View>
        <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.txt}>Pike Walk</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Pikewalk')}>
                <Image style={styles.Logo} source={require('./assets/pikewalk.png')} /></TouchableOpacity>

        </View>
        <Text style={{width:10}}></Text>
                <View style={styles.box}>
                <Text style={styles.txt}>Jumping Jacks</Text>
                <TouchableOpacity onPress={() => navigation.navigate('JumpingJacks')}>
                <Image style={styles.Logo} source={require('./assets/jumpingjacks.png')} /></TouchableOpacity>
                </View>

        </View>
        <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.txt}>Pistols</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Pistols')}>
                <Image style={styles.Logo} source={require('./assets/pistol.png')} /></TouchableOpacity>

        </View>
        <Text style={{width:10}}></Text>
                <View style={styles.box}>
                <Text style={styles.txt}>Push ups</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Pushups')}>
                <Image style={styles.Logo} source={require('./assets/pushup.png')} /></TouchableOpacity>
                </View>

        </View>
        <View style={styles.container}>
        <View style={styles.box}>
        <Text style={styles.txt}>Cross Jumps</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CrossJumps')}>
                <Image style={styles.Logo} source={require('./assets/crossjumps.png')} /></TouchableOpacity>
        </View>
        <Text style={{width:10}}></Text>
                <View style={styles.box}>
                <Text style={styles.txt}>Weighted Squats</Text>
                <TouchableOpacity onPress={() => navigation.navigate('WeightedSquats')}>
                <Image style={styles.Logo} source={require('./assets/wsquat.png')} /></TouchableOpacity>
                </View>

        </View>
        </ScrollView>

  )
}

export default Video


const styles = StyleSheet.create({  
    container: {
    
    backgroundColor: 'white',
    flexDirection:'row'

  },
  box:{
    height:160,
    width:150,
    backgroundColor:"lightgrey", 
    borderRadius:20,
    alignItems:'center',
    textAlign:'center',
    marginLeft:30, 
    marginTop:20
  },
  txt:{
    marginTop:7,
    fontWeight:'bold',
    fontSize:14
  }, Logo:{
            
    width: 120,
    height: 115,
    marginTop:10,
    borderRadius:20
  }

})