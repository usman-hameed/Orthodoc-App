import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import YoutubePlayer from 'react-native-youtube-iframe';


const Squats = ({navigation}) => {
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
    
            videoId={'dxmN_lQFZ5c'}
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
            >Squatting can help build leg and hip strength, leading to more stable joints. Over time, your range of motion will increase. As long as you're able to practice with minimal knee joint discomfort, it's safe to include squats in your exercise routine. </Text>
            </View>
        
          
    
        </View>
        </ScrollView>
  )
}

export default Squats


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