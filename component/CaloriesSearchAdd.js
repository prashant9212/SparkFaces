import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { toast } from "./common/toast";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../config/config";

const CaloriesSearchAdd = ({ navigation }) => {

  const route = useRoute();
  const ProductId = route.params.ProductId;
  console.log("Product Id : ", ProductId + " " + "Product Type : ", route?.params?.FoodType)

  const [Loading, setLoading] = useState(true);
  const [singalFood, setSingalFoodDetails] = useState();
  const [servings, setServings] = useState("1");
  console.log("serving Input", servings)

  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const SingalFoodFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + `diet-detail?id=${ProductId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const SingalProducts = response.data.data;
          console.log("All Singal Food Data", SingalProducts);
          setSingalFoodDetails(SingalProducts);
          setLoading(false);
        } catch (error) {
          console.log("Singal Food Details Error", error);
          setLoading(true);
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    }
    SingalFoodFun();
    asynget11();
  }, [userToken]);


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
              {route?.params?.FoodType}
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
          <View>
            <View style={{ margin: 10 }}>
              <View style={{ marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 5 }}>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ backgroundColor: '#eee', width: '100%', padding: 8, fontSize: 15, textTransform: 'capitalize' }}>{singalFood?.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#fff' }}>
                  <View style={{ flex: 3 }}>
                    <Image source={{ uri: singalFood?.diet_image }} style={styles.AddCalImg}></Image>
                  </View>
                  <View style={{ flex: 5 }}>
                    <Text style={styles.addCalTitle}>Calories</Text>
                    <Text style={styles.addCalDis}>{singalFood?.calories} cals/cup</Text>
                    <Text style={styles.addCalTitle}>Carbohydrates</Text>
                    <Text style={styles.addCalDis}>{singalFood?.carbs} gm</Text>
                  </View>
                  <View style={{ flex: 4 }}>
                    <Text style={styles.addCalTitle}>Fat</Text>
                    <Text style={styles.addCalDis}>{singalFood?.fat} gm</Text>
                    <Text style={styles.addCalTitle}>Proten</Text>
                    <Text style={styles.addCalDis}>{singalFood?.protein} gm</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text style={{ color: '#555' }}>Select The Serving Quantity</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <Text style={{ color: '#555' }}>Cup (250ml)</Text>
                </View>
              </View>
              <TextInput
                keyboardType="numeric"
                value={servings}
                onChangeText={setServings}
                style={{
                  width: 360,
                  backgroundColor: "#fff",
                  borderColor: "#eee",
                }}
                placeholder="Number of Servings"
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CaloriesSearch", {
                        type: route?.params?.FoodType,
                      });
                    }}
                  >
                    <Text style={styles.ProfileUpBtn}>Back</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 8 }}>
                  {/* <TouchableOpacity
                  onPress={async () => {
                    if (checkedItems.length === 0) {
                      toast("Please select one food");
                      return;
                    }

                  }}
                >
                  <Text style={styles.ProfileUpBtn}>Submit</Text>
                </TouchableOpacity> */}
                  {/* <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Calories");
                    }}>
                    <Text style={styles.ProfileUpBtn}>Add to Journal</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={async () => {
                      // if (checkedItems.length === null) {
                      //   toast("Please Enter");
                      //   return;
                      // }
                      try {
                        const userId = await AsyncStorage.getItem("user");
                        const token = await AsyncStorage.getItem("token");
                        if (servings.length < 1) {
                          toast("Please Enter Your " + singalFood?.title + " Servings Number...");
                          return;
                        }
                        console.log("Sending:");
                        axios
                          .post(
                            baseUrl + "create-plate",
                            {
                              type: route?.params?.FoodType,
                              user_id: JSON.parse(userId).id.toString(),
                              diet_id: ProductId,
                              servings: servings
                            },
                            {
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${JSON.parse(token)}`,
                              },
                            }
                          )
                          .then((res) => {
                            if (res.data.status) navigation.navigate("Calories");
                            else console.log("Failed send", res.data);
                          })
                          .catch((err) => {
                            console.log(err.response.data.data, err.response.status);
                          });
                      } catch (error) {
                        navigation.goBack();
                      }
                    }}
                  >
                    <Text style={styles.ProfileUpBtn}>Add to Journal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      )
      }

    </View>
  );
};

export default CaloriesSearchAdd;

