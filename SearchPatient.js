import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert
} from "react-native";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Button, SearchBar } from "react-native-elements";
import { db } from './firebase-config';
var Users = [];
const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "200%",
        backgroundColor: "white",
      }}
    />
  );
}


const SearchPatient = (props) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [mail, setMail] = useState("");  
  useEffect(() => {
      const querySnapshot = getDocs(collection(db, "users")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log("Usersss",doc.id, " => ", doc.data());
          Users.push(doc.data());
          setData(Users);
      });

      });
      
  }, []);
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search for a Patient"
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchBarInput}
          inputStyle={styles.searchBarInputText}
        />
      </View>
      <View style={styles.searchResults}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.uid}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={(item) => {
            console.log("Item b4 includes"+item.item.email);
            if (item.item.email?.includes(search) ||item.item.displayName?.includes(search)) {
              return ( 
                               
                <TouchableOpacity onPress={() => {
                  props.navigation.navigate("PatientProfile", {
                    params: {
                      param1:item.item.email,
                      current: "patient",
                    },
                  });
                }
                }
                >


<View style={{paddingHorizontal:10,paddingVertical:20, marginHorizontal:10, backgroundColor:"#f1f5f9", borderRadius:14, marginBottom:3  }}>

                  
                  <Text style={styles.flatlist}>
                    {item.item.email}
                  </Text>

                 
                  <Text style={styles.flatlist}>
                    {item.item.displayName??item.item.name}
                  </Text>

                </View>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    backgroundColor: "white",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderColor:"black",
    borderWidth:2,
  },
  searchBarInput: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
   
  },
  searchBarInputText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  searchResults: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius:20,
    paddingHorizontal:14,

  },

  searchResultText: {
    fontSize: 20,
    fontWeight: "bold",
    // color: "black",

  },
  flatlist: {
    fontSize: 15,
    fontWeight: "bold",
    // color: "black",
    width:330,
    borderRadius:10,
    borderBottomRightRadius:10
  },
});
export default SearchPatient;
