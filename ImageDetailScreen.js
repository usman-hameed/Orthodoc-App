import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "./constants/index";
import { useNavigation } from "@react-navigation/native";

const ImageDetailScreen = ({ route }) => {
  const uri = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={25}
            color={COLORS.gray}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: uri }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default ImageDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    top: 70,
    left: 20,
    width: 36,
    height: 36,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
