import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../config/config";

const MyLive = ({ navigation }) => {
  const route = useRoute();
  const id = route.params.id;
  useEffect(() => {
    const id = route.params.id;
  }, [route.params]);
  const [myLive, setMyLive] = useState();
  useEffect(() => {
    axios.get(baseUrl + `single-live-challenge?id=${id}`).then((res) => {
      setMyLive(res.data.data);
      console.log(res.data.data)
    });
  }, []);
  return (
    <View style={styles.containerHome}>
      <StatusBar />
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 8 }}>
            <Text style={{ textTransform: 'capitalize', height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              {myLive?.title}
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

      <ScrollView style={styles.scrollView}>
        <View style={{ marginTop: 5 }}>
          <Image style={{ width: "100%", height: 210 }} source={{ uri: `${myLive?.banner}` }}></Image>
          <View style={{ margin: 8, padding: 8, backgroundColor: '#fff', borderRadius: 5, elevation: 1, shadowColor: "#000", }}>
            <View style={{ flexDirection: 'row', }}>
              <Text style={{ padding: 10, fontSize: 20, fontWeight: '500', textTransform: 'capitalize' }}>{myLive?.title}</Text>
            </View>
            <View style={{ borderTopColor: '#eee', borderTopWidth: 1, paddingTop: 10, paddingBottom: 10, }}>
              <Text style={{ fontWeight: 'bold', padding: 10, }}>Description:</Text>
              <Text style={{ padding: 10, fontSize: 16, color: '#777', lineHeight: 22, textAlign: 'justify' }}>
                {myLive?.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

    </View>
  );
};

export default MyLive;
