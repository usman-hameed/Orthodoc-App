import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import colors from "./config/colors";
import { FONTS, COLORS } from "./constants/index";

import {
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import { Input, Button } from "react-native-elements";

const PaymentScreen = ({ route }) => {
  const [week, setWeek] = React.useState("");
  const [name, setName] = React.useState("");
  const [cardDetails, setCardDetails] = useState();
  const stripe = useStripe();
  const data = route.params;

  React.useEffect(() => {
    settingWeek();
  }, []);

  const API_URL =
    "https://us-central1-orthodoc-4a9ee.cloudfunctions.net/createStripeCheckout";

  const fetchPaymentIntentClientSecret = async () => {
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    try {
      //sending request

      const response = await fetch(
        { API_URL },
        {
          method: "POST",

          body: JSON.stringify({ name }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
        response
      );

      const data = await response.json();

      if (!response.ok) return Alert.alert("Error", data.message);
      console.log("2");
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Sipho",
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error)
        return Alert.alert("error", presentSheet.error.message);
      Alert.alert("Success", "Payment succeeded");
      // if (week === "Week 1") {
      //   updateDoc(doc(db, "users", user.uid), {
      //     isWeekOne: true,
      //   });
      // } else if (week === "Week 2") {
      //   updateDoc(doc(db, "users", user.uid), {
      //     isWeekTwo: true,
      //   });
      // } else if (week === "Week 3") {
      //   updateDoc(doc(db, "users", user.uid), {
      //     isWeekThree: true,
      //   });
      // } else {
      //   console.log("No Week");
      // }
    } catch (error) {
      console.log(error);
      Alert.alert("Unable to Process Payment", error.message);
    }
  };

  const settingWeek = () => {
    if (data === "week1") {
      setWeek("Week 1");
    } else if (data === "week2") {
      setWeek("Week 2");
    } else if (data === "week3") {
      setWeek("Week 3");
    } else {
      setWeek("Week");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Image
          source={require("./assets/favicon.png")}
          style={styles.imageCard}
        />
      </View>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titling}>
        Subscription for {week}
      </Text>
      <Input
        value={name}
        placeholder="Enter Full Name"
        placeholderTextColor={colors.gray}
        onChangeText={(text) => setName(text)}
      />

      <Button
        title="Subscribe"
        color={colors.primary}
        onPress={handlePayPress}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 17,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  card: {
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    borderColor: colors.light,
    borderWidth: 1,
    borderRadius: 7,
  },
  cardContainer: {
    width: "100%",
    height: 50,
    marginVertical: 30,
    borderRadius: 7,
  },

  imageCard: {
    width: 325,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  titling: {
    fontSize: 25,
    fontFamily: FONTS.bold,
    textAlign: "center",
    color: COLORS.gray,
    marginVertical: 10,
  },
});
