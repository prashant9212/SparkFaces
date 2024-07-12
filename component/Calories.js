import { View, Alert, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../styleSheet/mainStyle";
import { ActivityIndicator, List } from "react-native-paper";
import { CaloriesData, CalOverViewData } from "./DataApi/Data";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { baseUrl } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { toast } from "./common/toast";

const Calories = ({ navigation }) => {
  const [calories, setCalories] = useState();
  const [caloriesData, setCaloriesData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    asynget11();
  }, [userToken]);

  const getCalories = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const itemTypes = ["Breakfast", "Elevenses", "Lunch", "Supper", "Dinner"];

      const responses = await Promise.all(
        itemTypes.map(async (itemType) => {
          const CalRes = await axios.get(baseUrl + "calories-page", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });
          const AllCaloriesData3 = CalRes.data.data;
          setCalories(AllCaloriesData3)
          if (CalRes?.data) {
            const AllCaloriesData2 = CalRes.data?.data || [];
            if (AllCaloriesData2.plates) {
              try {
                const concernedData = AllCaloriesData2.plates.filter(
                  (item) => item.type.toLowerCase() === itemType.toLowerCase()
                )[0];
                return {
                  type: itemType,
                  data: concernedData.diets,
                  id: concernedData.id,
                };
              } catch (error) {
                return { type: itemType, data: [] };
              }
            }
          }
        })
      );
      console.log("CONCERNED DATA", responses);
      setCaloriesData(responses);
    } catch (error) {
      if (error.response.status === 401) {
        AsyncStorage.clear().finally(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }],
            })
          );
        });
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCalories();
  }, []);

  return (
    <>
      {calories?.target_calories !== null ? (
        <View style={{ backgroundColor: "#fff", height: "100%" }}>
          <StatusBar />
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
                  Calories
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
            <ScrollView style={styles.scrollView}>
              <View style={{ margin: 10 }}>
                <View>
                  <Text style={{ padding: 10, fontSize: 18, fontWeight: "500" }}>Overview</Text>
                  <View style={{ padding: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 6 }}>
                        <Text style={styles.OverTitle}>Net Calories</Text>
                        <View style={styles.OverDisc}>
                          {calories?.calories == 0 ? (<Text>0 Calories</Text>) : (<Text>{calories?.calories} Calories</Text>)}
                        </View>
                      </View>
                      <View style={{ flex: 6 }}>
                        <Text style={styles.OverTitle}>Target Calories</Text>
                        <View style={styles.OverDisc}>
                          {calories?.target_calories == null ? (<Text>0</Text>) : (<Text>{calories?.target_calories}</Text>)}
                        </View>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 6 }}>
                        <Text style={styles.OverTitle}>AIIM</Text>
                        {calories?.aiim == null ? (<Text style={styles.OverDisc}>No AIIM</Text>) : (<Text style={styles.OverDisc}>{calories?.aiim}</Text>)}
                      </View>
                      <View style={{ flex: 6 }}>
                        <Text style={styles.OverTitle}>Protein</Text>
                        <View style={styles.OverDisc}>
                          {calories?.protein == 0 ? (<Text>0</Text>) : (<Text>{calories?.protein}</Text>)}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    borderRadius: 10,
                    paddingBottom: 8,
                  }}
                >
                  <Text style={{ fontSize: 20, color: "#000", fontWeight: "bold" }}>Journals</Text>
                </View>

                {!Loading &&
                  ["Breakfast", "Elevenses", "Lunch", "Supper", "Dinner"].map((item, index) => {
                    return (
                      <View style={styles.CaloriCard}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                          <Text style={{ fontWeight: "bold", fontSize: 16, flex: 11, padding: 5, }}>{item}</Text>
                          {/* {caloriesData[index]?.data.length > 0 && (
                        <TouchableOpacity
                          style={{ flex: 1 }}
                          onPress={() => {
                            Alert.alert(
                              "Delete",
                              "Are you sure you want to delete " + item + " journal",
                              [
                                {
                                  text: "Cancel",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel",
                                },
                                {
                                  text: "OK",
                                  onPress: async () => {
                                    const token = await AsyncStorage.getItem("token");
                                    const res = await axios.post(
                                      baseUrl + "plate-delete",
                                      { id: caloriesData[index].id },
                                      {
                                        headers: {
                                          Authorization: `Bearer ${JSON.parse(token)}`,
                                        },
                                      }
                                    );
                                    if (res && res.data && res.data.status) {
                                      toast("Journal Deleted Successfully");
                                      getCalories();
                                    }
                                  },
                                },
                              ]
                            );
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "#fff",
                              width: 30,
                              height: 30,
                              borderRadius: 5,
                              padding: 5,
                            }}
                          >
                            <MaterialCommunityIcons
                              name="trash-can-outline"
                              size={20}
                              color={"#000"}
                            />
                          </View>
                        </TouchableOpacity>
                      )} */}
                          <TouchableOpacity
                            style={{ flex: 1, marginLeft: 10 }}
                            onPress={() => {
                              navigation.navigate("CaloriesSearch", {
                                type: item,
                              });
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "#fff",
                                width: 30,
                                height: 30,
                                borderRadius: 5,
                                padding: 5,
                                borderWidth: 1,
                                borderColor: "#eee"
                              }}
                            >
                              <MaterialCommunityIcons name="plus" size={16} color={"#000"} />
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View>
                          {caloriesData[index]?.data.length === 0 ? (
                            <>
                              <Text
                                style={{
                                  textAlign: "center",
                                  padding: 15,
                                  paddingLeft: 50,
                                  paddingRight: 50,
                                  fontSize: 13,
                                  color: "#555",
                                }}
                              >
                                Add items in your {item} journal to see them here.
                              </Text>
                            </>
                          ) : (
                            <View>
                              {caloriesData[index]?.data.map((diet) => {
                                return (
                                  <View style={styles.AddFoodBox}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text style={{ flex: 10, marginBottom: 8, }}>{diet.title}</Text>
                                      <TouchableOpacity
                                        style={{ flex: 0.5, marginRight: 10 }}
                                        onPress={() => {
                                          navigation.navigate("CaloriesEdit", {
                                            type: item,
                                            ProductId: diet.id,
                                            ServieId: diet.pivot.serving
                                          });
                                        }}
                                      >
                                        <View
                                          style={{
                                            backgroundColor: "#eee",
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            width: 22,
                                            height: 22,
                                            borderRadius: 5,
                                            padding: 4,
                                          }}
                                        >
                                          <MaterialCommunityIcons name="pencil" size={12} color={"#000"} />
                                        </View>
                                      </TouchableOpacity>
                                      {/* <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => {
                                      Alert.alert(
                                        "Delete",
                                        "Are you sure you want to delete " + item + " journal",
                                        [
                                          {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel",
                                          },
                                          {
                                            text: "OK",
                                            onPress: async () => {
                                              const token = await AsyncStorage.getItem("token");
                                              const res = await axios.post(
                                                baseUrl + "plate-delete",
                                                { id: diet.id },
                                                {
                                                  headers: {
                                                    Authorization: `Bearer ${JSON.parse(token)}`,
                                                  },
                                                }
                                              );
                                              if (res && res.data && res.data.status) {
                                                toast("Journal Deleted Successfully");
                                                getCalories();
                                              }
                                            },
                                          },
                                        ]
                                      );
                                    }}
                                  >
                                    <View
                                      style={{
                                        backgroundColor: "#fff",
                                        width: 30,
                                        height: 30,
                                        borderRadius: 5,
                                        padding: 5,
                                      }}
                                    >
                                      <MaterialCommunityIcons
                                        name="trash-can-outline"
                                        size={20}
                                        color={"#000"}
                                      />
                                    </View>
                                  </TouchableOpacity> */}
                                      <TouchableOpacity
                                        style={{ flex: .7, marginLeft: 10 }}
                                        onPress={() => {
                                          Alert.alert(
                                            "Delete",
                                            "Are you sure you want to delete " + diet.title + " from " + item + "...",
                                            [
                                              {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel",
                                              },
                                              {
                                                text: "OK",
                                                onPress: async () => {
                                                  const token = await AsyncStorage.getItem("token");
                                                  const res = await axios.post(
                                                    baseUrl + "plate-delete",
                                                    {
                                                      //id: diet.id,
                                                      diet_id: diet.id,
                                                      type: item
                                                    },
                                                    {
                                                      headers: {
                                                        Authorization: `Bearer ${JSON.parse(token)}`,
                                                      },
                                                    }
                                                  );
                                                  if (res && res.data && res.data.status) {
                                                    toast("Food Deleted Successfully");
                                                    getCalories();
                                                  }
                                                },
                                              },
                                            ]
                                          );
                                        }}
                                      >
                                        <View
                                          style={{
                                            backgroundColor: "#eee",
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            width: 22,
                                            height: 22,
                                            borderRadius: 5,
                                            padding: 4,
                                          }}
                                        >
                                          <MaterialCommunityIcons name="trash-can-outline" size={12} color={"#000"} />
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{diet.calories} Cals</Text>
                                      <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{diet.carbs} Carbs</Text>
                                      <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{diet.protein} Protein</Text>
                                      {/* <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{diet.fat} Fat</Text> */}
                                      <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{diet.pivot.serving} Serving</Text>
                                    </View>
                                  </View>
                                );
                              })}
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })}
              </View>
            </ScrollView>
          )}
        </View>) : (
        navigation.navigate("CaloriesQuestion")
      )
      }
    </>

  );
};

export default Calories;
