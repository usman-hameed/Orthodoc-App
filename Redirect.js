
import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";

export default function Redirect() {
  const animation = useRef(null);
  const navigation = useNavigation();
  // const animationRef = useRef(null);
  useEffect(() => {

  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        source={require('./assets/116087-payment-success.json')}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Home"
          onPress={() => {
 
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

