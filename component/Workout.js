import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WorkOutVideo } from './DataApi/Data'
import styles from '../styleSheet/mainStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Workout = ({ navigation }) => {
  const [Loading, setLoading] = useState(true);
  const [userToken, setMainToken] = useState();
  const [allWorkOut, setAllWorkOut] = useState();
  // useEffect(() => {
  //   axios.get(baseUrl + 'workout-list').then((res) => {
  //     setAllWorkOut(res.data.data);
  //     console.log(res.data.data)
  //   });
  // }, []);

  useEffect(() => {
    const WorkOutFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + 'workout-list', {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllWorkOutDetailsData = response.data.data;
          console.log("All WorkOut1 Data", AllWorkOutDetailsData);
          setAllWorkOut(AllWorkOutDetailsData);
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
          <Text style={{ flex: 10, height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
            Workouts
          </Text>
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
            {allWorkOut?.map((data, number) => {
              return (
                <View key={number.toString()} style={{ marginBottom: 10, padding: 8, elevation: 1, shadowColor: "#000", backgroundColor: '#fff', width: '100%', borderRadius: 10 }}>
                  <Image style={styles.WorkOutVideo} source={{ uri: `${data.workout_image}` }}></Image>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 8 }}>
                      <Text style={{ padding: 15, paddingLeft:5, fontSize: 18, fontWeight: '500'  }}>{data.title}</Text>
                    </View>
                    <View style={{ flex: 2, alignSelf: 'center', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("WODetailsPage", { id: data.id });
                        }}>
                        <MaterialCommunityIcons name="youtube" size={54} style={{ color: '#000' }} />
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

export default Workout