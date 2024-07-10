import {
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styleSheet/mainStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkOut, LiveChallanges, myPrograms, foodLogs } from "./DataApi/Data";
import { StatusBar } from "expo-status-bar";
import Calories from "./Calories";
import { baseUrl } from "../config/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { CommonActions, useFocusEffect } from "@react-navigation/native";

const Dashboard = ({ navigation }) => {
  const [Loading, setLoading] = useState();
  const [userToken, setMainToken] = useState();
  const [allWorkOut, setAllWorkOut] = useState();
  const [allLive, setAllLive] = useState();
  const [dietFood, setDietFood] = useState();
  const [myPrograms, setMyPrograms] = useState();
  const [userData2, setUserData2] = useState();
  const [cloading, cloading_] = useState(true);
  const [allLiveSession, setAllLiveSession] = useState();
  const [caloriesData, setCaloriesData] = useState([
    { type: "Breakfast", data: [] },
    { type: "Elevenses", data: [] },
    { type: "Lunch", data: [] },
    { type: "Supper", data: [] },
    { type: "Dinner", data: [] },
  ]);

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

          const AllCaloriesData2 = CalRes.data.data;
          // console.log(AllCaloriesData2);
          if (AllCaloriesData2.plates) {
            try {
              const concernedData = AllCaloriesData2.plates
                .filter(
                  (item) => item.type.toLowerCase() === itemType.toLowerCase()
                )[0]
                //.diets.map((diet) => diet.title);
                .diets;
              return { type: itemType, data: concernedData };
            } catch (error) {
              return { type: itemType, data: [] };
            }
          }
        })
      );
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
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCalories().then();
    }, [])
  );

  useEffect(() => {
    const getDashboardDetails = async () => {
      try {
        const response = await axios.get(baseUrl + "dashboard-detail", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        AsyncStorage.setItem("sessiontoken", response.data.session_token);
      } catch (err) {
        console.log("error in fetching dashboard details", err);
      }
    };

    axios.get(baseUrl + "live-challenge").then((res) => {
      setAllLive(res.data.data);
      //console.log(res.data.data)
    });

    const WorkOutFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + "workout-list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllWorkOutData = response.data.data;
          setAllWorkOut(AllWorkOutData);
        } catch (error) {
          console.log("Workout Error", error);
        }
      }
    };

    const LiveSession = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + "live-session", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllLiveSession = response.data.data;
          //console.log("All Live Session Data", AllLiveSession);
          setAllLiveSession(AllLiveSession);
          setLoading(false);
        } catch (error) {
          console.log("All Live Session Error", error);
          setLoading(true);
        }
      }
    };

    const DietFoodFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + "diet-list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllDietData = response.data.data;
          //console.log("All Diet Data", AllDietData);
          setDietFood(AllDietData);
        } catch (error) {
          console.log("Workout Error", error);
        }
      }
    };

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
        } catch (error) {
          console.log("Program Error", error);
        }
      }
    };

    // axios.get(baseUrl + "programmvideo_list").then((res) => {
    //   setMyPrograms(res.data.data);
    //   //console.log(res.data.data)
    // });
    const asynget = async () => {
      const user = await AsyncStorage.getItem("user");
      setUserData2(JSON.parse(user));
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    function transformApiResponse(response) {
      const transformedData = {};

      response.plates.forEach((plate) => {
        if (!transformedData[plate.type]) {
          transformedData[plate.type] = [];
        }

        plate.diets.forEach((diet) => {
          transformedData[plate.type].push(diet.title);
        });
      });

      return transformedData;
    }

    asynget();
    asynget11().then(() => {
      cloading_(true);
      WorkOutFun().then();
      ProgramFun().then();
      DietFoodFun().then();
      LiveSession().then();
      getDashboardDetails().then();
      getCalories().then();
      cloading_(false);
    });
  }, [userToken]);

  return (
    <View style={styles.containerHome}>
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
          <View
            style={{
              flex: 1,
              padding: 2,
              width: 80,
              height: 40,
              margin: 12,
              textAlign: "center",
              borderRadius: 50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Image
                style={{
                  resizeMode: "cover",
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                }}
                source={require("../assets/user.jpg")}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              flex: 10,
              fontSize: 14,
              marginTop: 14,
              paddingLeft: 10,
              color: "#777",
              fontWeight: "100",
            }}
          >
            <Text style={{ fontSize: 20, color: "#000", fontWeight: "500" }}>
              Hey, {userData2?.first_name}
            </Text>{" "}
            {"\n"}
            Welcome Back
          </Text>
        </View>
      </View>
      {/* Header */}

      {!cloading ? (
        <ScrollView style={styles.scrollView}>
          <View
            style={{
              elevation: 1,
              shadowColor: "#000",
              backgroundColor: "#fff",
              width: "96%",
              marginStart: "2%",
              marginTop: "2%",
              borderRadius: 20,
              paddingBottom: 0,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  flex: 10,
                  fontSize: 17,
                  padding: 11,
                  paddingBottom: 3,
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                Continue Workout
              </Text>
              <View
                style={{
                  textTransform: "lowercase",
                  flex: 2,
                  fontSize: 16,
                  padding: 11,
                  paddingRight: 0,
                  paddingBottom: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Workout");
                  }}
                >
                  <Text style={{ color: "#000" }}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ borderRadius: 10, paddingBottom: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  endFillColor="#000"
                  overScrollMode="never"
                >
                  {allWorkOut?.map((data, number) => {
                    return (
                      <View key={number.toString()}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("WODetailsPage", {
                              id: data.id,
                            });
                          }}
                        >
                          <Image
                            style={styles.DashCardList}
                            source={{ uri: `${data.workout_image}` }}
                          ></Image>
                          <Text
                            style={{
                              fontWeight: "500",
                              textAlign: "center",
                              fontSize: 14,
                            }}
                          >
                            {data.title}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>

          <View
            style={{
              elevation: 1,
              shadowColor: "#000",
              backgroundColor: "#fff",
              width: "96%",
              marginStart: "2%",
              marginTop: "2%",
              borderRadius: 20,
              paddingBottom: 0,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                flex: 10,
                fontSize: 17,
                padding: 11,
                paddingBottom: 3,
                color: "#000",
                fontWeight: "500",
              }}
            >
              Live Challenges
            </Text>
            <View style={{ borderRadius: 10, paddingBottom: 10 }}>
              {Loading ?
                <View style={{ alignItems: 'center', }}>
                  <ActivityIndicator size="small" style={{ marginTop: '20%', }} />
                  <Text style={{ marginTop: 10, }}>Coming Soon...</Text>
                </View>
                :
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                  }}
                >
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    endFillColor="#000"
                    overScrollMode="never"
                    backgroundColor="#fff"
                  >
                    {allLiveSession?.map((item, number) => {
                      return (
                        <View
                          key={item.room_id}
                          style={{ margin: "2%", width: 350, borderRadius: 5 }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("LVDetailsPage", {
                                RoomId: item.room_id,
                              });
                            }}
                          >
                            <Image
                              style={styles.LiveChalangesList}
                              source={{ uri: item.thumbnail }}
                            ></Image>
                            <View>
                              <Text
                                style={{
                                  paddingLeft: 7,
                                  color: "#000",
                                  fontSize: 18,
                                  textTransform: "capitalize",
                                }}
                              >
                                {item.title}
                              </Text>
                            </View>
                            <View style={styles.LiveBox}>
                              <Text
                                style={{
                                  padding: 7,
                                  color: "#000",
                                  fontSize: 13,
                                }}
                              >
                                Start Session at {item.session_time}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>

                </View>
              }
            </View>
          </View>

          {/* <View
            style={{
              elevation: 1,
              shadowColor: "#000",
              backgroundColor: "#fff",
              width: "96%",
              marginStart: "2%",
              marginTop: "2%",
              borderRadius: 20,
              paddingBottom: 0,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                flex: 10,
                fontSize: 17,
                padding: 11,
                paddingBottom: 3,
                color: "#000",
                fontWeight: "500",
              }}
            >
              Live Challanges
            </Text>
            <View style={{ borderRadius: 10, paddingBottom: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  endFillColor="#000"
                  overScrollMode="never"
                >
                  {allLive?.map((data, number) => {
                    return (
                      <View key={number.toString()}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("MyLive", { id: data.id });
                          }}
                        >
                          <Image
                            style={styles.LiveChalangesList}
                            source={{ uri: data.banner }}
                          ></Image>
                          <View style={styles.LiveBox1}>
                            <Text
                              style={{
                                padding: 4,
                                color: "#fff",
                                fontSize: 16,
                                textTransform: "capitalize",
                              }}
                            >
                              {data.title}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View> */}

          {/* Recording cards */}
          {/* <View
                    style={{
                        elevation: 1,
                        shadowColor: "#000",
                        backgroundColor: "#fff",
                        width: "96%",
                        marginStart: "2%",
                        marginTop: "2%",
                        borderRadius: 20,
                        paddingBottom: 0,
                        padding: 5,
                        borderRadius: 10,
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text
                            style={{
                                flex: 10,
                                fontSize: 17,
                                padding: 11,
                                paddingBottom: 3,
                                color: "#000",
                                fontWeight: "500",
                            }}
                        >
                            Recordings
                        </Text>
                        <View
                            style={{
                                textTransform: "lowercase",
                                flex: 2,
                                fontSize: 16,
                                padding: 11,
                                paddingRight: 0,
                                paddingBottom: 1,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    // navigation.navigate("M3U8Player",);
                                }}
                            >
                                <Text style={{ color: "#000" }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderRadius: 10, paddingBottom: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                endFillColor="#000"
                                overScrollMode="never"
                            >
                                {recordingData.map((recording, number, index) => {
                                    return (
                                        <View key={number.toString()}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    console.log(recording.id);
                                                    navigation.navigate("M3U8Player", { id: recording.id });
                                                }}
                                            >
                                                {recording.thumbnails === null ?
                                                    <Image
                                                        style={styles.myProgramsList}
                                                        source={require("../assets/myPrograms.jpg")} />
                                                    : <Image source={{ uri: recording.thumbnails[index] }} style={styles.myProgramsList} />
                                                }
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                {formatDate(recording.created_at)} - {Math.ceil(recording.duration / 60)} Min
                                            </Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View> */}

          <View
            style={{
              elevation: 1,
              shadowColor: "#000",
              backgroundColor: "#fff",
              width: "96%",
              marginStart: "2%",
              marginTop: "2%",
              borderRadius: 20,
              paddingBottom: 0,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  flex: 10,
                  fontSize: 17,
                  padding: 11,
                  paddingBottom: 3,
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                My Programmes
              </Text>
              <View
                style={{
                  textTransform: "lowercase",
                  flex: 2,
                  fontSize: 16,
                  padding: 11,
                  paddingRight: 0,
                  paddingBottom: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MyPrograms");
                  }}
                >
                  <Text style={{ color: "#000" }}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ borderRadius: 10, paddingBottom: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  endFillColor="#000"
                  overScrollMode="never"
                >
                  {myPrograms?.map((data, number) => {
                    return (
                      <View key={number.toString()}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("MyProgramsDetails", {
                              id: data.id,
                            });
                          }}
                        >
                          <Image
                            style={styles.myProgramsList}
                            source={{ uri: `${data?.thumbnail}` }}
                          ></Image>
                          <Text style={{ textAlign: "center" }}>
                            {data?.title}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </View>

          <View
            style={{
              elevation: 1,
              shadowColor: "#000",
              backgroundColor: "#fff",
              width: "96%",
              marginStart: "2%",
              marginTop: "2%",
              marginBottom: "2%",
              borderRadius: 20,
              paddingBottom: 0,
              padding: 5,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  flex: 10,
                  fontSize: 17,
                  padding: 11,
                  paddingBottom: 3,
                  color: "#000",
                  fontWeight: "500",
                }}
              >
                Food Logs
              </Text>
              <View
                style={{
                  textTransform: "lowercase",
                  flex: 2,
                  fontSize: 16,
                  padding: 11,
                  paddingRight: 0,
                  paddingBottom: 1,
                }}
              >
                {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CaloriesSearch");
                  }}
                >
                  <Text style={{ color: "#000" }}>See All</Text>
                </TouchableOpacity> */}
              </View>
            </View>
            <View style={{ borderRadius: 10, paddingBottom: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  endFillColor="#000"
                  overScrollMode="never"
                >
                  {caloriesData.map((item) => {
                    return (
                      <View style={styles.CaloriCardDasHome}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 16,
                              flex: 10,
                            }}
                          >
                            {item.type}
                          </Text>
                          <TouchableOpacity
                            style={{ flex: 1, maxHeight: 50 }}
                            onPress={() => {
                              navigation.navigate("CaloriesSearch", {
                                type: item.type,
                              });
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: 4,
                                padding: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                width: 25,
                                height: 25
                              }}
                            >
                              <MaterialCommunityIcons
                                name="plus"
                                size={16}
                                color={"#000"}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={{ flex: 4, display: "flex" }}>
                          {item.data.length === 0 ? (
                            <Text
                              style={{
                                textAlign: "center",
                                padding: 5,
                                paddingLeft: 50,
                                paddingRight: 50,
                                fontSize: 16,
                                color: "#555",
                              }}
                            >
                              Add items in your {item.type} journal to see them
                              here.
                            </Text>
                          ) : (
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {item.data.map((items, number) => {
                                return (
                                  <View style={styles.AddFoodBox1}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text style={{ flex: 10, marginBottom: 8, }}>{items.title}</Text>
                                      <TouchableOpacity
                                        style={{ flex: 0.5, marginRight: 10 }}
                                        onPress={() => {
                                          navigation.navigate("CaloriesEdit", {
                                            type: item.type,
                                            ProductId: items.id,
                                            ServieId: items.pivot.serving
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
                                      <TouchableOpacity
                                        style={{ flex: .7, marginLeft: 10 }}
                                        onPress={() => {
                                          Alert.alert(
                                            "Delete",
                                            "Are you sure you want to delete " + items.title + " from " + item.type + "...",
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
                                                      diet_id: items.id,
                                                      type: item.type
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
                                      <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{items.calories} Cals</Text>
                                      <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{items.carbs} Carbs</Text>
                                      {/* <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{items.protein} Protein</Text>
                                      <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{items.fat} Fat</Text> */}
                                      <Text style={{ backgroundColor: '#f7f7f7', borderWidth: 1, borderColor: '#eee', padding: 2, paddingLeft: 5, marginRight: 10, borderRadius: 10, fontSize: 11 }}>{items.pivot.serving} Serving</Text>
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
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="small" style={{ marginTop: "20%" }} />
          <Text style={{ marginTop: 10 }}>Please Wait...</Text>
        </View>
      )}
    </View>
  );
};

export default Dashboard;
