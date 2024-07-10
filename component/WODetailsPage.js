import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

const WODetailsPage = ({ navigation }) => {
  const route = useRoute();
  const id = route.params.id;
  //console.log("Find Id " + id)
  useEffect(() => {
    const id = route.params.id;
  }, [route.params]);
  const [workOutDetails, setWorkOutDetails] = useState();
  const [Loading, setLoading] = useState(true);
  const [userToken, setMainToken] = useState();
  const regex = /(<([^>]+)>)/ig;
  useEffect(() => {
    const WorkOutFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + `workout-detail?id=${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllWorkOutDetailsData = response.data.data;
          console.log("All WorkOut Data", AllWorkOutDetailsData);
          setWorkOutDetails(AllWorkOutDetailsData);
          setLoading(false)
        } catch (error) {
          console.log("WorkOut Details Error", error);
          setLoading(true)
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    }
    WorkOutFun();
    asynget11();
  }, [userToken]);


  return (
    <View style={styles.containerHome}>
      <StatusBar />
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 8 }}>
            <Text style={{ height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              Workout Details
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
        : <ScrollView style={styles.scrollView}>
          <View style={{ marginTop: 5 }}>
            <Image style={{ width: "100%", height: 210 }} source={{ uri: `${workOutDetails?.workout_image}` }}></Image>
            <View style={{ margin: 8, padding: 8, backgroundColor: '#fff', borderRadius: 5, elevation: 1, shadowColor: "#000", }}>
              {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate("WODetailsPage");
              }}> */}
              <View style={{ flexDirection: 'row', }}>
                <Text style={{ flex: 8.5, fontSize: 18, fontWeight: 'bold' }}>{workOutDetails?.title}</Text>
              </View>
              {/* </TouchableOpacity> */}
              <View style={{ paddingTop: 10, paddingBottom: 10, borderTopColor: '#eee', borderTopWidth: 1, marginTop: 15, }}>
                <Text style={{ fontWeight: 'bold', paddingBottom: 10, fontSize: 14 }}>{workOutDetails?.workout_type_title}:</Text>
                <Text style={{ color: '#777', lineHeight: 20 }}>{workOutDetails?.description.replace(regex, '')}</Text>
              </View>
            </View>
          </View>
        </ScrollView>}

    </View>
  );
};

export default WODetailsPage;
