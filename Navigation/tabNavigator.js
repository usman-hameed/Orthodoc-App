import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MainStackNavigator,
  ContactStackNavigator,
  LoginStackNavigator,
} from "./stackNavigator";
import Home from "../Home";
import forgotPass from "../forgotPass";
import Situps from "../Videos/Situps";
import Settings from "../Settings";
import DocHome from "../DocPanel/DocHome";
import DocSettings from "../DocPanel/DocSettings";
import Inbox from "../Inbox";
import DocInbox from "../DocPanel/DocInbox";

import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const DocTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#03045E",
        keyboardHidesTabBar: true,
        inactiveTintColor: "black",
        pressColor: "gray",
        style: {
          borderTopWidth: 0,
          //  position: 'absolute' ,
          borderTopColor: "#aaaaaa",
          backgroundColor: "#aaaaaa",
          // elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="DocHome"
        component={DocHome}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          tabBarOptions: {
            style: {
              backgroundColor: "#aaaaaa", //color you want to change
            },
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen name="SitStand"  component={ContactStackNavigator} options={{          tabBarOptions:{
            style: {
              backgroundColor: '#aaaaaa',//color you want to change
            },
          }, title: 'Sit Stand', headerStyle: {
            backgroundColor: '#35414F',
          },headerTintColor: '#fff',headerTitleStyle: {
            fontWeight: 'bold',
          }, headerTitleAlign: 'center' }}/> */}
      <Tab.Screen
        name="DocInbox"
        component={DocInbox}
        options={{
          tabBarOptions: {
            style: {
              backgroundColor: "#aaaaaa", //color you want to change
            },
          },
          title: "Inbox",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="inbox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DocSettings "
        component={DocSettings}
        options={{
          tabBarOptions: {
            style: {
              backgroundColor: "#aaaaaa", //color you want to change
            },
          },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#35414F" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#03045E",
        keyboardHidesTabBar: true,
        inactiveTintColor: "black",
        pressColor: "gray",
        style: {
          borderTopWidth: 0,
          //  position: 'absolute' ,
          borderTopColor: "#aaaaaa",
          backgroundColor: "#aaaaaa",
          // elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          tabBarOptions: {
            style: {
              backgroundColor: "#aaaaaa", //color you want to change
            },
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SitStand"
        component={ContactStackNavigator}
        options={{
          tabBarOptions: {
            style: {
              backgroundColor: "#aaaaaa", //color you want to change
            },
          },
          title: "Excersise Videos",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarOptions: {
            style: {
              backgroundColor: "#aaaaaa", //color you want to change
            },
          },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#35414F" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="inbox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings "
        component={Settings}
        options={{
          tabBarOptions: {
            style: {
              backgroundColor: "#aaaaaa", //color you want to change
            },
          },
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#35414F" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { BottomTabNavigator, DocTabNavigator };
