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

const CaloriesEdit = ({ navigation }) => {

  const route = useRoute();
  const ProductId = route.params.ProductId;
  const ServieId = route.params.ServieId;
  console.log("Product Id : ", ProductId + " " + "Product Type : ", route?.params?.type, " Servie Id : ", + ServieId)

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
                placeholder="Please Enter New Servings Number"
              />
              <Text style={{ padding: 2, }}>You Have Total Servings {singalFood.title} Count = {ServieId}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Calories");
                    }}
                  >
                    <Text style={styles.ProfileUpBtn}>Back</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 8 }}>
                  <TouchableOpacity
                    onPress={async () => {
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
                              type: route?.params?.type,
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
                    <Text style={styles.ProfileUpBtn}>Update</Text>
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

export default CaloriesEdit;

