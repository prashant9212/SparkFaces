import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from "react";
import { AllMyPrograms, OurBlogs, myPrograms } from './DataApi/Data'
import styles from '../styleSheet/mainStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import { baseUrl } from "../config/config";
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPrograms = ({ navigation }) => {
  const [myPrograms, setMyPrograms] = useState();
  const [Loading, setLoading] = useState(true);
  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const ProgramFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + "programmvideo_list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllProgramData = response.data.data;
          console.log("Program", AllProgramData);
          setMyPrograms(AllProgramData);
          setLoading(false)
        } catch (error) {
          console.log("Program Error", error);
          setLoading(true)
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

  return (
    <View style={styles.containerHome}>
      <StatusBar />
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 8 }}>
            <Text style={{ height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              My Programs
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
        <ScrollView>
          <View style={{ width: '96%', marginStart: '2%', marginTop: '2%', borderRadius: 20, paddingBottom: 0, padding: 0, }}>
            {myPrograms?.map((data, number) => {
              return (
                <View key={number.toString()} style={{ marginBottom: 10, padding: 8, elevation: 1, shadowColor: "#000", backgroundColor: '#fff', width: '100%', borderRadius: 10 }}>
                  <Image style={styles.BlogImg} source={{ uri: `${data.thumbnail}` }}></Image>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, }}>
                    <View style={{ flex: 5, paddingLeft: 0, }}>
                      <Text style={{ paddingBottom: 15, fontSize: 18, fontWeight: '500' }}>{data.title}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("MyProgramsDetails", { id: data.id });
                        }}>
                        <View>
                          <Text style={{ textAlign: 'center', width: 90, padding: 8, paddingLeft: 12, paddingRight: 12, color: '#fff', borderRadius: 20, fontSize: 12, borderColor: '#ccc', borderWidth: 1, fontWeight: '500', backgroundColor: '#000' }}>Play Video</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>
              )
            })}
          </View>
        </ScrollView>
      }
    </View>
  )
}

export default MyPrograms