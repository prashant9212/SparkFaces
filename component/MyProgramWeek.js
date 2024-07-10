import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyProgramWeekSingle from "./MyProgramWeekSingle";
import axios from "axios";
import { baseUrl } from "../config/config";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();

const MyProgramWeek = ({ navigation }) => {
  const route = useRoute();
  const [weekData, weekData_] = useState({});
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      axios
        .get(baseUrl + "programmdetails?id=" + route.params.id, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((res) => {
          weekData_(res.data.data);
        });
    });
  }, []);

  return (
    weekData?.week1 && (
      <Tab.Navigator
        initialRouteName="Week1"
        screenOptions={{
          tabBarScrollEnabled: true,
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
        {weekData.week1 && (
          <Tab.Screen
            name="Week1"
            initialParams={{ initialParams: weekData.week1 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 1" }}
          />
        )}
        {weekData.week2 && (
          <Tab.Screen
            name="Week2"
            initialParams={{ initialParams: weekData.week2 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 2" }}
          />
        )}
        {weekData.week3 && (
          <Tab.Screen
            name="Week3"
            initialParams={{ initialParams: weekData.week3 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 3" }}
          />
        )}
        {weekData.week4 && (
          <Tab.Screen
            name="Week4"
            initialParams={{ initialParams: weekData.week4 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 4" }}
          />
        )}
        {weekData.week5 && (
          <Tab.Screen
            name="Week5"
            initialParams={{ initialParams: weekData.week5 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 5" }}
          />
        )}
        {weekData.week6 && (
          <Tab.Screen
            name="Week6"
            initialParams={{ initialParams: weekData.week6 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 6" }}
          />
        )}
        {weekData.week7 && (
          <Tab.Screen
            name="Week7"
            initialParams={{ initialParams: weekData.week7 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 7" }}
          />
        )}
        {weekData.week8 && (
          <Tab.Screen
            name="Week8"
            initialParams={{ initialParams: weekData.week8 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 8" }}
          />
        )}
        {weekData.week9 && (
          <Tab.Screen
            name="Week9"
            initialParams={{ initialParams: weekData.week9 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 9" }}
          />
        )}
        {weekData.week10 && (
          <Tab.Screen
            name="Week10"
            initialParams={{ initialParams: weekData.week10 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 10" }}
          />
        )}
        {weekData.week11 && (
          <Tab.Screen
            name="Week11"
            initialParams={{ initialParams: weekData.week11 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 11" }}
          />
        )}
        {weekData.week12 && (
          <Tab.Screen
            name="Week12"
            initialParams={{ initialParams: weekData.week12 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 12" }}
          />
        )}
        {weekData.week13 && (
          <Tab.Screen
            name="Week13"
            initialParams={{ initialParams: weekData.week13 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 13" }}
          />
        )}
        {weekData.week14 && (
          <Tab.Screen
            name="Week14"
            initialParams={{ initialParams: weekData.week14 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 14" }}
          />
        )}
        {weekData.week15 && (
          <Tab.Screen
            name="Week15"
            initialParams={{ initialParams: weekData.week15 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 15" }}
          />
        )}
        {weekData.week16 && (
          <Tab.Screen
            name="Week16"
            initialParams={{ initialParams: weekData.week16 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 16" }}
          />
        )}
        {weekData.week17 && (
          <Tab.Screen
            name="Week17"
            initialParams={{ initialParams: weekData.week17 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 17" }}
          />
        )}
        {weekData.week18 && (
          <Tab.Screen
            name="Week18"
            initialParams={{ initialParams: weekData.week18 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 18" }}
          />
        )}
        {weekData.week19 && (
          <Tab.Screen
            name="Week19"
            initialParams={{ initialParams: weekData.week19 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 19" }}
          />
        )}
        {weekData.week20 && (
          <Tab.Screen
            name="Week20"
            initialParams={{ initialParams: weekData.week20 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 20" }}
          />
        )}
        {weekData.week21 && (
          <Tab.Screen
            name="Week21"
            initialParams={{ initialParams: weekData.week21 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 21" }}
          />
        )}
        {weekData.week22 && (
          <Tab.Screen
            name="Week22"
            initialParams={{ initialParams: weekData.week22 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 22" }}
          />
        )}
        {weekData.week23 && (
          <Tab.Screen
            name="Week23"
            initialParams={{ initialParams: weekData.week23 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 23" }}
          />
        )}
        {weekData.week24 && (
          <Tab.Screen
            name="Week24"
            initialParams={{ initialParams: weekData.week24 }}
            component={MyProgramWeekSingle}
            options={{ tabBarLabel: "Week 24" }}
          />
        )}
      </Tab.Navigator>
    )
  );
};

export default MyProgramWeek;
