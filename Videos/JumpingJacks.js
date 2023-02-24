import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import YoutubePlayer from 'react-native-youtube-iframe';


const JumpingJacks = ({navigation}) => {
  return (
    <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              paddingTop:20,
              fontSize:17,
              textAlign: 'center',
              fontWeight: 'bold',
              paddingRight:5,
              paddingBottom:20}}
            >Exercise Tutorial</Text>
          {/* <Text  style={{
              textAlign: 'center',
              // color: 'grey',
              fontWeight: 'bold',
              paddingRight: 25,
              fontSize: 14,
              paddingBottom:50
            }}></Text> */}
<View style={styles.Utext}>
            <Text style={{
              fontSize:14,
              marginLeft:7,
              paddingRight:5,
              paddingBottom:10,
              
            }}
            // 
            >Starting with a version of the movement that you can carry out safely and easily is important. </Text>
            </View>
            <Text style={{paddingBottom:10,}}></Text>
            <View>
          <YoutubePlayer
            // height={500}
            // play={true}
            // videoId={'v=mLI_QxszYrU'}
            height={250}
    
            play={false}
    
            videoId={'OdwQj7ogGlY'}
          /></View>
          <View style={styles.Vtext}>
            <Text style={{
              fontSize:14,
              marginLeft:7,
              paddingRight:5,
              paddingBottom:10,
            //   marginTop:50
              
            }}
            // Starting with a version of the movement that you can carry out safely and easily is important.
            >Jumping jacks similarly work on the leg muscles, joints, and bones.If you do them often enough, your body will adapt by increasing both bone and muscle mass to make your knees stronger.</Text>
            </View>
        
          
    
        </View>
        </ScrollView>

  )
}

export default JumpingJacks


const styles = StyleSheet.create({  
  container: {
    
    backgroundColor: '#aaaaaa',
    flex:1,
    height:775

  },
  Vtext:{
    backgroundColor:'#dddbdb',
    borderRadius:10,
  },
  Utext:{
    backgroundColor:'#c06b6b',
    borderRadius:10,
  },

})