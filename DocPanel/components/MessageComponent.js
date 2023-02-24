import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { authentication } from "../../firebase-config";
import { Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native";

const MessageComponent = ({ data, onPressImage }) => {
  return (
    <View style={styles.mainContainer}>
      {data.sentBy === authentication.currentUser.email ? (
        <View style={styles.sender}>
          {data.type === "text" ? (
            <Text style={styles.senderText}>{data.text}</Text>
          ) : (
            <TouchableWithoutFeedback onPress={onPressImage}>
              <View style={styles.senderImage}>
                <Image
                  source={{ uri: data.text }}
                  style={{ width: 150, height: 150 }}
                  resizeMode="cover"
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      ) : (
        <View style={styles.receiver}>
          {data.type === "text" ? (
            <Text style={styles.receiverText}>{data.text}</Text>
          ) : (
            <TouchableWithoutFeedback onPress={onPressImage}>
              <View style={styles.receiverImage}>
                <Image
                  source={{ uri: data.text }}
                  style={{ width: 150, height: 150 }}
                  resizeMode="cover"
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      )}
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  senderText: {
    color: "white",
    padding: 10,
    fontSize: 12,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  sender: {
    backgroundColor: "#2B68E6",
    alignSelf: "flex-end",
    borderRadius: 10,
    marginRight: 15,
  },
  receiver: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 10,
    marginLeft: 15,
  },
  receiverText: {
    color: "black",
    padding: 10,
    fontSize: 12,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  mainContainer: {
    marginVertical: 5,
    padding: 5,
  },
});
