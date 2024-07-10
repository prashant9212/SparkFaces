import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../config/config";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyProgramsDetails = ({ navigation }) => {
  const route = useRoute();
  const id = route.params.id;
  console.log(id)
  useEffect(() => {
    const id = route.params.id;
  }, [route.params]);


  const [Loading, setLoading] = useState(true);
  const [programDetails, setProgramDetails] = useState();
  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const ProgramFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + `programmdetails?id=${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllProgramData = response.data.data;
          console.log("All Program Data", AllProgramData);
          setLoading(false);
          setProgramDetails(AllProgramData);
        } catch (error) {
          console.log("Program Error", error);
          setLoading(true);
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    }
    ProgramFun();
    asynget11();
  }, [userToken]);
  const regex = /(<([^>]+)>)/ig;
  return (
    <View style={styles.containerHome}>
      <StatusBar />
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 8 }}>
            <Text style={{ height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              My Programs Details
            </Text>
          </View>
          <View style={{ flex: 2, alignSelf: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}>
              <MaterialCommunityIcons name="home" size={24} style={{ color: '#000' }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Header */}
      {Loading ?
        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator size="small" style={{ marginTop: '20%', }} />
          <Text style={{ marginTop: 10, }}>Please Wait...</Text>
        </View>
        :
        <ScrollView style={styles.scrollView}>

          <View style={{ marginTop: 5 }}>
            <Image style={{ width: "100%", height: 210 }} source={{ uri: `${programDetails?.thumbnail}` }}></Image>
            <View style={{ margin: 8, padding: 8, backgroundColor: '#fff', borderRadius: 5, elevation: 1, shadowColor: "#000", }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MyProgramWeek", { id: programDetails.id });
                }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ padding: 10, fontSize: 20, fontWeight: '500' }}>{programDetails?.title}</Text>
                </View>
              </TouchableOpacity>
              <View style={{ borderTopColor: '#eee', borderTopWidth: 1, paddingTop: 10, paddingBottom: 10, }}>
                <Text style={{ fontWeight: 'bold', padding: 10, }}>Description:</Text>
                <Text style={{ padding: 10, fontSize: 16, color: '#777', lineHeight: 22, textAlign: 'justify' }}>
                  {programDetails?.description.replace(regex, '')}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      }
    </View>
  );
};

export default MyProgramsDetails;
