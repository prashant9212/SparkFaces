import { View, Text, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput, Checkbox, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../config/config";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { toast } from "./common/toast";
import Item from "./Item";

const CaloriesSearch = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [Loading, setLoading] = React.useState(true);
  const [caloriesData, setCaloriesData] = useState([]);
  const [renderData, setRenderData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [userToken, setMainToken] = useState();
  const [concernedData, setConcernedData] = useState([]);
  const [searchq, setSearchq] = useState([]);


  useEffect(() => {
    const setResults = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${baseUrl}diet-list?title=${searchq}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        const res = await response.json();
        console.log("Response", res);

        if (res.data && res.data.length > 0) {
          setRenderData(res.data);
        } else {
          setRenderData(caloriesData);
        }
      } catch (error) {
        console.log("Error", error, searchq);
      }
    };
    if (searchq.length > 1) setResults().then();
    setResults([]);
  }, [searchq]);

  const route = useRoute();
  useEffect(() => {
    const DietFoodFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + "diet-list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllCaloriesData = response.data.data;
          setRenderData(AllCaloriesData);
          setCaloriesData(AllCaloriesData);
          console.log("Food Data" + AllCaloriesData)
        } catch (error) {
          if (error.response.status === 429) DietFoodFun().then();
          // if (error.response.data.status === 401)
          //   AsyncStorage.clear().finally(() => {
          //     navigation.dispatch(
          //       CommonActions.reset({
          //         index: 0,
          //         routes: [{ name: "Login" }],
          //       })
          //     );
          //   });
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    asynget11();
    DietFoodFun();
  }, [userToken]);

  useEffect(() => {
    const getCalories = async () => {
      try {
        const tokenNew = await AsyncStorage.getItem("token");
        const CalRes = await axios.get(baseUrl + "calories-page", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenNew}`,
          },
        });
        const AllCaloriesData2 = CalRes.data.data;
        if (AllCaloriesData2.plates) {
          try {
            const concernedData = AllCaloriesData2.plates
              .filter((item) => item.type.toLowerCase() === route.params?.type.toLowerCase())[0]
              .diets.map((item) => item.id);
            setCheckedItems(concernedData);
          } catch (error) {
            setCheckedItems([]);
          }
        }
      } catch (error) {
        // if (error.response.status === 401)
        //   AsyncStorage.clear().finally(() => {
        //     navigation.dispatch(
        //       CommonActions.reset({
        //         index: 0,
        //         routes: [{ name: "Login" }],
        //       })
        //     );
        //   });
      }
    };
    getCalories().finally(() => {
      setLoading(false);
    });
  });


  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignContent: "center",
          }}
        >
          <View style={{ flex: 8 }}>
            <Text
              style={{
                textTransform: "capitalize",
                height: 45,
                fontSize: 18,
                marginTop: 14,
                paddingLeft: 20,
                color: "#000",
              }}
            >
              {route?.params?.type}
            </Text>
          </View>
          <View style={{ flex: 2, alignSelf: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <MaterialCommunityIcons name="home" size={24} style={{ color: "#000" }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Header */}

      {Loading ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="small" style={{ marginTop: "20%" }} />
          <Text style={{ marginTop: 10 }}>Please Wait...</Text>
        </View>
      ) : (
        <View>
          <View style={{ width: 360, margin: "3%", borderRadius: 5 }}>
            <Text>
              <TextInput
                value={searchq}
                onChangeText={setSearchq}
                style={{
                  width: 360,
                  backgroundColor: "#fff",
                  borderColor: "#eee",
                }}
                placeholder="Enter Food Name"
              />
            </Text>
          </View>
          <View>
            <View style={{ margin: 10 }}>
              {renderData?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CaloriesSearchAdd", {
                        FoodType: route?.params?.type,
                        ProductId: item.id
                      });
                    }}
                  >
                    <View key={index} style={{ marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={{ backgroundColor: '#eee', width: '100%', padding: 8, fontSize: 15, textTransform: 'capitalize' }}>{item.title}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#fff' }}>
                        <View style={{ flex: 3 }}>
                          <Image source={{ uri: item.diet_image }} style={styles.AddCalImg}></Image>
                        </View>
                        <View style={{ flex: 5 }}>
                          <Text style={styles.addCalTitle}>Calories</Text>
                          <Text style={styles.addCalDis}>{item.calories} cals/cup</Text>
                          <Text style={styles.addCalTitle}>Carbohydrates</Text>
                          <Text style={styles.addCalDis}>{item.carbs} gm</Text>
                        </View>
                        <View style={{ flex: 4 }}>
                          <Text style={styles.addCalTitle}>Fat</Text>
                          <Text style={styles.addCalDis}>{item.fat} gm</Text>
                          <Text style={styles.addCalTitle}>Proten</Text>
                          <Text style={styles.addCalDis}>{item.protein} gm</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CaloriesSearch;

