import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./stackNavigator";
import { MainStackNavigator } from "./stackNavigator";

import BottomTabNavigator from "./tabNavigator";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Contact" component={ContactStackNavigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
