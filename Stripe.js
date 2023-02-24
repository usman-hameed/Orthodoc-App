import React ,{useEffect, useState} from 'react'   
import { View, StyleSheet, Text,TextInput, TouchableOpacity, Modal } from "react-native";
    // PaymentMethodCreateParams,
    import { useNavigation } from "@react-navigation/native";
    import LottieView from 'lottie-react-native';
import { CardField, useStripe, confirmPayment } from '@stripe/stripe-react-native';
import { COLORS } from './constants';
const Stripe = () => {
  const navigation = useNavigation();

    const [success, setSuccess ] = useState(false)
    const [loading,setLoading]=useState(false)
    const stripe = useStripe()


    const inputStyles  = {
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderRadius: 8,
    fontSize: 14,
    placeholderColor: '#999999',
    padding:20
    };

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch("https://server-ten-ruby.vercel.app/api/payment-sheet", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'usd',
                amount: 2000,
            }),
        });
        console.log(response);
        const {clientSecret} = await response.json();
        console.log(clientSecret)
    
        return clientSecret;
      };
      const handlePayPress = async () => {
        console.log("444")
        const billingDetails = {
            email: 'jenny.rosen@example.com',
          };
          console.log("before intent");
          // Fetch the intent client secret from the backend
          const clientSecret = await fetchPaymentIntentClientSecret();
        console.log("after intent");
      
          // Confirm the payment with the card details
          const {paymentIntent, error} = await confirmPayment(clientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
              billingDetails,
            },
          });

          console.log("f2ddqd")
      
          if (error) {
            console.log('Payment confirmation error', error);
          } else if (paymentIntent) {
            console.log('Success from promise', paymentIntent);
          }
      };

      const handlePaymentStarted=()=>{
        setLoading(true);
        setTimeout(()=>{
          setSuccess(true);
          setLoading(false)
        },6000);
      }

  return (
   <>
    <View style={styles.center}>


<CardField
    postalCodeEnabled={true}
    autofocus
    placeholder={{
    number: '4242 4242 4242 4242',
    postalCode: '12345',
    cvc: 'CVC',
    expiration: 'MM|YY',
    }}
    onCardChange={(cardDetails) => {
    console.log('cardDetails', cardDetails);
    
    }}
    onFocus={(focusedField) => {
    console.log('focusField', focusedField);
    }}
    cardStyle={inputStyles}
    style={styles.cardField}
/>
<TouchableOpacity onPress={handlePaymentStarted} style={{backgroundColor:"#3f5063", padding:15,paddingHorizontal:30, borderRadius:10}}>
    <Text style={{color:"white", fontSize:15, fontWeight:"500"}}>Pay Now</Text>
</TouchableOpacity>
</View>
<Modal visible={loading}>
  <LottieView loop autoPlay source={require('./assets/loading.json')} />
</Modal>
<Modal visible={success}>
 <View style={{flex:1}}>
 <LottieView loop autoPlay source={require('./assets/116087-payment-success.json')} />
  <TouchableOpacity style={styles.thisthis} onPress={()=>{
    setSuccess(false)
    navigation.navigate('Home');
  }}>
    <Text style={styles.thisBtn}>Go Back</Text>
  </TouchableOpacity>
 </View>
</Modal>
</>   
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding:10,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  input: {
    height: 44,
    borderBottomColor: '#0A2540',
    borderBottomWidth: 1.5,

  },
  thisthis:{
    padding:12,
    backgroundColor:COLORS.primary,
    justifyContent:'center',
    alignItems:"center"
  },
  thisBtn:{
    fontSize:18,
    fontWeight:'bold',
    color:COLORS.white
    
  }
});

export default Stripe;