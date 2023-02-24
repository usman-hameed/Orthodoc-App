import { View, Text } from 'react-native';
import React, { useState, useCallback, useEffect ,useLayoutEffect } from 'react';
import { signOut } from 'firebase/auth';
import {Input, Button, Avatar} from 'react-native-elements';
import { authentication } from './firebase-config';
import { db } from './firebase-config';
import { GiftedChat } from 'react-native-gifted-chat';
// import { Avatar } from 'react-native-paper';




const ChatScreen = ({navigation}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


    // useLayoutEffect(() => {
    //     navigation.setOptions({
    
    //         headerRight: () => (
    //             <Button
    //                 // style={{marginLeft: 10}}
    //                 title="Logout"
    //                 onPress={signoutUser}
    //             />
    //         )
    //     })
    // }
    // , [])


    // const signoutUser=()=>{
    //     signOut(authentication)
    //     .then(( ) => {
    //         navigation.canGoBack() && navigation.popToTop();
    //     }
    //     ).catch((err) => {
    //         console.log(err);
    //     }
    //     )
    // }
    return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    )
}

export default ChatScreen