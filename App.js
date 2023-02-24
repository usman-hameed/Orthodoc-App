import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from './Navigation/stackNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
const Stack = createNativeStackNavigator();


  return(
    <StripeProvider publishableKey='pk_test_51M0lQaKzco1s0qVzsrIv96isxw4acwLmoD6Zbp1o43Us1lPLhoDt497SQTKhAe840FgBWIZ2Ri6vaXxZt9bKm2pJ00UxKIXhvY'>
      <NavigationContainer>
      <MainStackNavigator/>    
    </NavigationContainer>
    </StripeProvider>
  );
   
}
export default App;