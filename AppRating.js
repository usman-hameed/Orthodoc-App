// React Native Custom Star Rating Bar
// https://aboutreact.com/react-native-custom-star-rating-bar/

// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { authentication } from './firebase-config';
import { db } from './firebase-config';


const Rating = () => {
  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(3);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [message, setMessage] = useState("");
  

  // Filled Star. You can also give the path from local
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const addData = () => {


    const email = authentication.currentUser.email;
    const myDoc= doc(db, 'Rating',email);
    console.log(email);
    console.log(defaultRating);
    console.log(message);
    
    
    const docData = {
      "email": email,
      "Rating": defaultRating,
      "Message": message,
    };
    
    setDoc(myDoc, docData).then(() => {
      alert("Your Opinion Matters, Thank You for Rating Us :)")
      console.log('Document written with ID: ', myDoc.id);
    }).catch((error) => {
      console.error('Error adding document: ', error.message);
    })
  
  
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>

        <Text style={styles.textStyle}>How was your experience with OrthoDoc</Text>
        <Text style={styles.textStyleSmall}>Please Rate Us</Text>

        <CustomRatingBar />
        <Text style={styles.textStyle}>
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
        <TextInput
        value={message}
            multiline
          label="Email"
          placeholder="Write to Us"
          style={styles.inputContainer}
          onChangeText={setMessage}
          
          >

          </TextInput>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => addData()}>
          <Text style={styles.buttonTextStyle}>Submit</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: '#35414F',
    color: 'white',
    height: 40,
    padding: 10,
    width: '80%',
    borderRadius: 5,
    marginLeft: 35,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderRadius:10,
    height: 100,
    width: '75%',
    marginLeft: 30,
    marginBottom:5,
    padding:9,
},
});
