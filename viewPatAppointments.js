import react, { useState, useEffect } from "react";
import {  
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    button 
  } from "react-native";
import { db } from "./firebase-config";
import { useNavigation } from "@react-navigation/native";
import { authentication } from "./firebase-config";
// import { collection, getDocs, where, query } from 'firebase/firestore';
import { collection, getDocs, where,doc, updateDoc, query } from 'firebase/firestore';


import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const viewPatAppointments = (props) => {
  const navigation = useNavigation();
  const [success, setSuccess ] = useState(false)
  const [loading,setLoading]=useState(false)

    const [appointments, setAppointments] = useState([]);

    useEffect(()=>{
        get();
      }, [])

      async function getAppointments(){
        const list =[];
        const docRef = await getDocs(query(collection(db, 'appointments'),where('patientId', '==', `${authentication.currentUser?.email}`)));
          docRef.forEach((each)=>{
            list.push( {id:each.id, ...each.data()});
          })
          setAppointments(list);
          console.log(list);

          console.log("Arr",appointments);
          return list;
      };
    
      const handlePayment=()=>{
        setLoading(true);
        setTimeout(()=>{
          setSuccess(true);
          setLoading(false);
          alert("Appointment Deleted Successfully!");
        navigation.navigate("Home");
        },1000);
        
      
      }

      async function get(){
        const selectedAppointments = await getAppointments();
      }
      async function deleteAppointment(id, status, paymentId){
        if(status !== 'active'){
          alert('Cannot delete appointment at this stage!');
          return;
        }   
        try{
          // await axios.post("https://server-ten-ruby.vercel.app/api/refund", {
          //           paymentId: paymentId          
          //           })
          await updateDoc(doc(db, 'appointments', id),{
            status: 'deleted'
          })
          handlePayment();

        }catch(e){
          alert(e.message)
        }
      }
    


  return (
    <ScrollView>
    <View style={styles.center}>
        <View style = {{flexDirection:"row",  backgroundColor:"#ffff", width:"100%"}}>
            <Text style={styles.txt}> Doctor email</Text>
            <Text style={styles.txt1}> Time</Text>
            <Text style={styles.txt2}> Date</Text>
            <Text style={styles.txt3}> Status</Text>
            <Text style={styles.txt4}> Actions</Text>

        </View>
       { appointments.map((slot)=>
                <View style = {{flexDirection:"row",  backgroundColor:"#ffff", width:"100%", marginBottom:5,paddingVertical:5}}>

                <Text style={{    padding:5, width:"32%", fontSize:14, justifyContent: "center",alignItems: "center",textAlign: "center",}}>{slot.doctorId}</Text>
                <Text style={{    padding:5, width:"12%", fontSize:14 , justifyContent: "center",alignItems: "center",textAlign: "center",}}>{slot.timeSlot}</Text>
                <Text style={{    padding:5, width:"19%" , fontSize:14 , justifyContent: "center",alignItems: "center",textAlign: "center",}} > { new Date(slot.date.seconds*1000).toLocaleDateString()  } </Text>
                {
                    slot.status === 'active' && <Text style={{    padding:5, width:"19%" , fontSize:14, color: 'blue' , justifyContent: "center",alignItems: "center",textAlign: "center",}}>{slot.status}</Text>
                }
                  {
                    slot.status === 'completed' && <Text style={{padding:3,paddingLeft:5, width:"19%" , fontSize:13, color: 'green' , justifyContent: "center",alignItems: "center",textAlign: "center",}}>{slot.status}</Text>
                }
                  {
                    slot.status === 'deleted' && <Text style={{    padding:5, width:"19%" , fontSize:14, color: 'red', justifyContent: "center",alignItems: "center",textAlign: "center",}}>{slot.status}</Text>
                }
                <TouchableOpacity   onPress={() => {
                  props.navigation.navigate("DocProfile", {
                    params: {
                      param1:slot.doctorId,
                      current: "doctor",
                    },
                  });
                }
                }>
                <MaterialCommunityIcons name="account" size={26} color="black" style={{marginLeft:5,paddingRight:5}} />
                </TouchableOpacity >
                <TouchableOpacity onPress={()=>deleteAppointment(slot.id, slot.status, slot.paymentId)}>
                <MaterialCommunityIcons name="delete" size={26} color="red" style={{marginLeft:7}}/>
                </TouchableOpacity>

                </View>
       
       )}


    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor:"#f1f5f9",
  },
  txt:{

    padding:10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginRight:5, paddingRight:10, fontWeight:"bold",
  },
  txt1:{
    fontWeight:"bold",
    marginLeft:7,
    padding:10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginRight:5, 
    paddingLeft:15,
    paddingRight:7

  },
  txt2:{
    fontWeight:"bold",
    paddingRight:12,
    marginLeft:9,

    padding:10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  txt3:{
    fontWeight:"bold",
    paddingRight:12,
    paddingLeft: 13,
    padding:10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  txt4:{
    fontWeight:"bold",
    paddingRight:7,
    marginLeft:7,
    padding:10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
export default viewPatAppointments;