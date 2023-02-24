import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import { orderBy } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { authentication, db, storage } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { query, where,Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import MessageComponent from "./DocPanel/components/MessageComponent";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "./config/colors";
import { FONTS, COLORS } from "./constants/index";
import * as ImagePicker from 'expo-image-picker';

import { uploadBytes } from "firebase/storage";



export default function Chat(props) {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [temp, setTemp] = useState("");
  const imageRef = useRef(null);

  let messageArraay = [];
  const querySnapshot = async () => {
    const col = collection(db, "chatroom");
    const q = query(
      col,
      where(
        "chatId",
        "==",
        props.route.params.params.userid + props.route.params.params.docid
      ),
      orderBy("createdAt", "asc")
    );
    const snap = await getDocs(q);

    snap.forEach((doc) => {
      const new_obj = {
        ...doc.data(),
      };

      messageArraay.push(new_obj);
    });
    setMessages(messageArraay);
  };
  useEffect(() => {
    querySnapshot();
  }, []);

  const sendImageMessage = async (uri) => {
    try{
      const image = uri;
      const fileType = uri.split('.')[3];
      // console.log(fileType);
      const response = await fetch(uri);
  
      const blobFile = await response.blob();
  
      const storageRef = ref(storage, "ABC.jpg"
        // `image-${Date.now()}.${fileType}`
        );
      const result= await uploadBytes(storageRef, blobFile);
      // .then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      // });
      console.log(result);
      const url = await getDownloadURL(result);
      console.log(url);

  
      return url

      
    }
    catch(e){
      console.log(e);
      return Promise.reject(e);
    }


    // const uploadTask = uploadBytesResumable(storageRef, image);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //   },
    //   (error) => {
    //     console.log(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       addMessage(downloadURL, "image");
    //     });
    //   }
    // );
  };

  const addMessage = async (temp, type) => {
    try {
      const mymsg = {
        sentBy:
          props.route.params.params.current == "doctor"
            ? props.route.params.params.docid
            : props.route.params.params.userid,
        sentTo:
          props.route.params.params.current == "doctor"
            ? props.route.params.params.userid
            : props.route.params.params.docid,

        createdAt: Timestamp.fromDate(new Date()),
        chatId:
          props.route.params.params.userid + props.route.params.params.docid,
        text: temp,
        type: type,
      };
      const myDoc = doc(db, "chatroom", new Date().toString());
      setDoc(myDoc, mymsg);
      setTemp("");
      setMessages((prev) => [...prev, mymsg]);
      
    } catch (error) {
      console.log(error);

    }
  };
  const sendTextMessage = () => {
    addMessage(temp, "text");
    setTemp("");
  };


  const pickDocument = async () => {


    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
        // console.log(result.assets[0].uri);
        if (!result.canceled) {
          console.log("ABC")
         
          sendImageMessage(result.assets[0].uri);
        }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.list}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.createdAt.toString()}
          renderItem={({ item }) => (
            <MessageComponent
              data={item}
              onPressImage={() => navigation.navigate("imagedetail", item.text)}
            />
          )}
        />
      </View>
      <View style={styles.sendingContainer}>
        <TextInput placeholder="Send Message" onChangeText={setTemp} value={temp} style={styles.input} />
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.sendAttachment}  onPress={pickDocument}>
            <MaterialCommunityIcons
              name="attachment"
              size={25}
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendAttachment} onPress={sendTextMessage} disabled={temp.length===0?true:false}>
            <Text style={styles.sendText}>Send</Text>

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list:{
    marginBottom:35
  },
  yourmsg: {
    backgroundColor: "green",
    marginBottom:500
  },
  othermsg: {
    backgroundColor: "red",
  },
  mainContainer: {
    flex: 1,
    
  },
  input: {
    height: 40,
    padding: 10,
  },
  innerContainer: {
    flexDirection: "row",
    
  },
  sendingContainer: {
    flexDirection: "row",
    maxHeight: 90,
    justifyContent: "space-between",
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    width: "100%",
    
  },
  sendAttachment: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    
  },
  sendText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.secondary,
    
  },
});