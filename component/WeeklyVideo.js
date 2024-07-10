import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Week1 from "./WeeklyScreen/Week1";
import Week2 from "./WeeklyScreen/Week2";
import Week3 from "./WeeklyScreen/Week3";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const WeeklyVideo = ({ navigation }) => {
  const filterCriteria = {
    createdBefore: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    minDuration: 1,
    maxDuration: 200000,
    type: "room-vod",
  };

  const [recordingData, setRecordingData] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${day}/${month}/${year} at ${hours}:${formattedMinutes}${amPm}`;
  };

  const fetchAllRecordings = async () => {
    const token = await AsyncStorage.getItem("sessiontoken");
    try {
      const response = await axios.get("https://api.100ms.live/v2/recording-assets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const recordings = response.data.data;
      console.log("recordings Data", recordings.length);

      const filteredRecordings = recordings.filter((recording) => {
        const createdAt = new Date(recording.created_at).toISOString();
        return (
          createdAt > filterCriteria.createdBefore &&
          recording.duration >= filterCriteria.minDuration &&
          recording.duration <= filterCriteria.maxDuration &&
          recording.type === filterCriteria.type
        );
      });
      setRecordingData(filteredRecordings);
    } catch (error) {
      console.log("error fetching recordings", error);
    }
  };

  useEffect(() => {
    console.log(recordingData.length);
  }, [recordingData]);

  useEffect(() => {
    fetchAllRecordings();
  }, []);

  if (recordingData.length === 0)
    return (
      <View style={{ alignItems: "center" }}>
        <ActivityIndicator size="small" style={{ marginTop: "20%" }} />
        <Text style={{ marginTop: 10 }}>Please Wait...</Text>
      </View>
    );
  return (
    <Tab.Navigator
      initialRouteName="Week1"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "500",
          marginTop: 40,
          textTransform: "capitalize",
        },
        tabBarStyle: { backgroundColor: "#f8ebff" },
        tabBarIndicatorStyle: {
          backgroundColor: "#000",
          height: 2,
          borderRadius: 100,
        },
      }}
    >
      <Tab.Screen
        name="Week1"
        initialParams={{ initialParams: recordingData.slice(0, 7) }}
        component={Week1}
        options={{ tabBarLabel: "Week 1" }}
      />
      <Tab.Screen
        name="Week2"
        initialParams={{ initialParams: recordingData.slice(7, 14) }}
        component={Week2}
        options={{ tabBarLabel: "Week 2" }}
      />
      <Tab.Screen
        name="Week3"
        initialParams={{ initialParams: recordingData.slice(14, 21) }}
        component={Week3}
        options={{ tabBarLabel: "Week 3" }}
      />
    </Tab.Navigator>
  );
};

export default WeeklyVideo;
