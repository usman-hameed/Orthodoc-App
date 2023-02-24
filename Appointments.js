import react, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,button
} from "react-native";
import { db } from "./firebase-config";
import { authentication } from "./firebase-config";
import { collection, getDocs, where, query,addDoc, Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';



const Appointment = (props) => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [show, setShow] = useState(false);

  const [selectedAppointments, setSelectedAppointments] = useState([]);

  useEffect(()=>{
    if(!authentication.currentUser){
      navigation.navigate('login');
      return 
      <View>
          Loading
      </View>
      
  }else{
    getSlots();
  }
  },[])

  useEffect(()=>{
    getSlots();
  }, [date])

  async function getAppointments(){
    const list =[];
      const docRef = await getDocs(query(collection(db, 'appointments'),where('doctorId', '==', `${props.route.params.params.docid}`),where('status', '==', `active`)));
      docRef.forEach((each)=>{
        list.push( {id:each.id, ...each.data()});

      })
      console.log(list);
      return list;

  };
  async function handleNavigate(slot){
    try{
        if(!date || !slot){
          alert("Please select date or time")
          return;
        }
      console.log(date);
      const appointment = {
        doctorId: props.route.params.params.docid,
        patientId: authentication.currentUser?.email,
        date: Timestamp.fromDate(date),
        timeSlot: slot,

  }

      await addDoc(collection(db, 'appointments'),{
              paymentId: `pi_${Date.now()}`,
              ...appointment,
              status: 'active'
      })
      navigation.navigate("Stripe");
     }catch(e){
      console.log(e)
     }
  }
  async function getSlots(){
    let list = [];
    let x = {
        slotInterval: 30,
        openTime: props.route.params.params.startTime,
        closeTime: props.route.params.params.endTime
      };
    let startTime = moment(x.openTime, "HH:mm");
    let endTime = moment(x.closeTime, "HH:mm").add(0, 'days');
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();
    
    while (startTime < endTime) {
      if(current.localeCompare(startTime.format("HH:mm")) === 1 && now.getDay() === date.getDay()){
        startTime.add(x.slotInterval, 'minutes');
      }else{
        list.push(startTime.format("HH:mm"));
        startTime.add(x.slotInterval, 'minutes');
      }
      }
      const selectedAppointments = await getAppointments();



      for(let i = 0; i<selectedAppointments.length; i++){

        const index = list.indexOf(selectedAppointments[i].timeSlot);
        const d = new Date(selectedAppointments[i].date.seconds*1000).toDateString();
        const sel = new Date(date).toDateString();
        const check = d === sel;
        if(index !== -1 && check){

          list.splice(index, 1);
          console.log(index);
        }
        console.log("List",list.length);
        
        console.log("ABC",slots.length);
      }
      setSlots(list);
}


  const tileDisabled = ({ activeStartDate, date, view }) => {
    return  date.getDay() === 0 
    
 }
//  
const showMode = (currentMode) => {
  try{

    DateTimePickerAndroid.open({
      value: date,
      onChange,
      // mode:"time",
      mode: currentMode,
      is24Hour: true,
      // display:"spinner",
      maximumDate: new Date(Date.now()+7*24*60*60*1000),
      minimumDate:new Date(),
      themeVariant:"dark",
      positiveButton:{label: 'OK', textColor: 'green'},
      minuteInterval:30,
    });
  }
  catch(e){
    console.log(e);
  }

};

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  setDate(currentDate);
};

  return (
    <View style={styles.center}>
      <View style={{marginBottom:60,justifyContent: "center", marginRight:25}}>
    <TouchableOpacity onPress={showMode} style={{ marginTop: 20,
    backgroundColor: "#35414F",
    color: "white",
    height: 40,
    padding: 10,
    // width: "70%",
    borderRadius: 5,
    marginLeft: 50,}}>
      <Text style={{textAlign: "center",
                color: "white",
                fontWeight: "bold",
                justifyContent: "center", textColor:"white", paddingLeft:5, paddingRight:5}}>
        select Date
      </Text>
      
    </TouchableOpacity>
    </View>
    {console.log(date)}

      <View  style={{flexDirection:'row',width:"100%", justifyContent: "center",}}>
     <Text style={{fontSize:15, fontWeight:"500"}}>Appointments Available for </Text>
      <Text style={{fontSize:16,  fontWeight:"600"}}>{date.toDateString()}</Text>
     </View>


      

<View style={{flexDirection:'row',width:"100%", flexWrap:"wrap",     justifyContent: "center",
}}>
  {
slots.map((slot)=>

            

              <TouchableOpacity style={styles.button}
              onPress={()=>handleNavigate(slot)}
            // activeOpacity={0.1}
            >
            <Text  style={{
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                justifyContent: "center",
              }} >{slot}</Text>
            </TouchableOpacity>          
          )
        }
        </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex:1,
    // flexDirection:'row',
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor:"#f9fafb",
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#f8f8f9",
    color: "white",
    height: 40,
    padding: 8,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
    marginLeft: 10,
    flexDirection:"row",
    borderColor:"black",
    borderWidth:1,
  },
});

export default Appointment;


