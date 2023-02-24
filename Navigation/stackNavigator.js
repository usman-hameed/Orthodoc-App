import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import forgotPass from "../forgotPass";
import login from "../login";
import Home from "../Home";
import Video from "../Video";
import SearchDoc from "../SearchDoc";
import Signup from "../Signup";
import SearchPatient from "../SearchPatient";
import DocHome from "../DocPanel/DocHome";
import { BottomTabNavigator, DocTabNavigator } from "./tabNavigator";
import DocSignup from "../DocSignup";
import Edit from "../edit";
import ChangePass from "../ChangePass";
import Settings from "../Settings";
import Rating from "../AppRating";
import DocProfile from "../DocProfile";
import PatientProfile from "../DocPanel/PatientProfile";
import { Avatar } from "react-native-paper";
import Chat from "../chat";
import FetchPatients from "../DocPanel/FetchPatients";
import FetchDoc from "../fetchDoc";
import DocEdit from "../DocPanel/DocEdit";
import DocChangePass from "../DocPanel/DocChangePass";
//Videos
import BicycleCrunches from "../Videos/BicycleCrunches";
import CrossJumpRot from "../Videos/CrossJumpsRot";
import Pistols from "../Videos/pistols";
import Squats from "../Videos/Squats";
import Situps from "../Videos/Situps";
import Burpees from "../Videos/Burpees";
import BoxJump from "../Videos/BoxJump";
import Pikewalk from "../Videos/Pikewalk";
import JumpingJacks from "../Videos/JumpingJacks";
import Pushups from "../Videos/Pushups";
import WeightedSquats from "../Videos/WeightedSquats";
import CrossJumps from "../Videos/CrossJumps";
import PaymentScreen from "../payment";
import ImageDetailScreen from "../ImageDetailScreen";
import Appointment from "../Appointments";
import viewPatAppointments from "../viewPatAppointments";
import Stripe from "../Stripe";
import Redirect from "../Redirect";
import DocAppointment from "../DocAppointment";


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ screenOptionStyle }}>
      <Stack.Screen
        name="login"
        component={login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="DocHome"
        component={DocTabNavigator}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="searchDoc"
        component={SearchDoc}
        options={{
          title: "Search Doctor",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="DocSignup"
        component={DocSignup}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SearchPatient"
        component={SearchPatient}
        options={{
          title: "Search Patient",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Edit"
        component={Edit}
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="DocEdit"
        component={DocEdit}
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Changepass"
        component={ChangePass}
        options={{
          title: "Edit Password",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="DocChangepass"
        component={DocChangePass}
        options={{
          title: "Edit Password",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={forgotPass}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signUp"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        component={Settings}
        options={{ headerShown: false }}
      />

<Stack.Screen
        name="Redirect"
        component={Redirect}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false  } } /> */}

      <Stack.Screen
        name="DocProfile"
        component={DocProfile}
        options={{
          title: "Doctor's Profile",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="PatientProfile"
        component={PatientProfile}
        options={{
          title: "Patient's Profile",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          title: "Chat",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Appointment"
        component={Appointment}
        options={{
          title: "Appointment Booking",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="DocAppointment"
        component={DocAppointment}
        options={{
          title: "Booked Appointment",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ViewPatAppointments"
        component={viewPatAppointments}
        options={{
          title: "Booked Appointment",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="FetchPatients"
        component={FetchPatients}
        options={{
          title: "Fetch Patients",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="FetchDoctors"
        component={FetchDoc}
        options={{
          title: "Fetch Doctors",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Contact"
        component={Rating}
        options={{
          title: "Contact Us",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="BicycleCrunches"
        component={BicycleCrunches}
        options={{
          title: "Bicycle Crunches",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="CrossJumpsRot"
        component={CrossJumpRot}
        options={{
          title: "Cross Jumps Rotation",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Pistols"
        component={Pistols}
        options={{
          title: "Pistols",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Squats"
        component={Squats}
        options={{
          title: "Squats",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Situps"
        component={Situps}
        options={{
          title: "Situps",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Burpees"
        component={Burpees}
        options={{
          title: "Burpees",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="imagedetail"
        component={ImageDetailScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BoxJump"
        component={BoxJump}
        options={{
          title: "Box Jumps",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Pikewalk"
        component={Pikewalk}
        options={{
          title: "Pike Walks",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="JumpingJacks"
        component={JumpingJacks}
        options={{
          title: "Jumping Jacks",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Pushups"
        component={Pushups}
        options={{
          title: "PushUps",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="WeightedSquats"
        component={WeightedSquats}
        options={{
          title: "Weighted Squats",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="CrossJumps"
        component={CrossJumps}
        options={{
          title: "Cross Jumps",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
 <Stack.Screen
        name="Stripe"
        component={Stripe}
        options={{
          title: "Payment Screen",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />


      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function LogoTitle() {
  return (
    <Avatar.Image
      rounded
      size={30}
      style={{ marginLeft: 10, backgroundColor: "#aaaaaa" }}
      source={require("../assets/icon.png")}
    />
  );
}

// {navigation,route}
function LoginStackNavigator() {
  // if(route.state && route.state.index>0){
  //   navigation.setOptions({tabBarVisible: false})

  // }
  // else{
  //   navigation.setOptions({tabBarVisible: true})
  // }

  return (
    <Stack.Navigator screenOptions={{ screenOptionStyle }}>
      <Stack.Screen
        name="Login"
        component={login}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="searchDoc"
        component={SearchDoc}
        options={{
          title: "Search Doctor",
          headerStyle: {
            backgroundColor: "#35414F",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={forgotPass}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signUp"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Squat"
        component={Video}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Forgot" component={forgotPass} options={{headerShown: false  } }/> */}
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ContactStackNavigator, LoginStackNavigator };
