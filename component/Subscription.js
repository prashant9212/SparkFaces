import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styleSheet/mainStyle";
import { StatusBar } from "expo-status-bar";
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";
import { encode } from "base-64";
import { clearStorage, resetToLogin, toast } from "./common/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../config/config";
import { CommonActions } from "@react-navigation/native";

const Subscription = ({ navigation }) => {
  const [allPackage, setPackage] = useState();
  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const PackageFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + "package-list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllPackageData = response.data.data;
          console.log("All package-list", AllPackageData);
          setPackage(AllPackageData);
        } catch (error) {
          AsyncStorage.clear().finally(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          });

          console.log("package-list Error", error);
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    PackageFun();
    asynget11();
  }, [userToken]);

  return (
    <>
      <StatusBar />
      <View style={styles.containerSub}>
        <View style={{ alignSelf: "center" }}>
          <Image
            style={styles.SubscriptionImg}
            source={require("../assets/subscription.jpg")}
          ></Image>
        </View>
        <View
          style={{
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: "#FFEBEE",
            width: "100%",
            height: "100%",
            borderTopEndRadius: 50,
            borderTopStartRadius: 50,
            paddingTop: 50,
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 15 }}>
            Our Best Package
          </Text>
          <View style={{ flexDirection: "row" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              endFillColor="#000"
              overScrollMode="never"
            >
              {allPackage?.map((item, index) => {
                return (
                  <View style={styles.PackageBox}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontStyle: "italic",
                        textTransform: "capitalize",
                        minHeight: 40,
                      }}
                    >
                      Plan : {item.name}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 7 }}>
                        <Text
                          style={{
                            fontWeight: "500",
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: 32,
                          }}
                        >
                          ₹{item.price}
                        </Text>
                      </View>
                      <View style={{ flex: 5 }}>
                        <TouchableOpacity
                          onPress={() => {
                            const username = "rzp_test_2jvYUT4uSx76mh";
                            const password = "uAAtOpYOJ5YyD9xECEACe2Wk";
                            const authHeader = `Basic ${encode(`${username}:${password}`)}`;
                            axios
                              .post(
                                "https://api.razorpay.com/v1/orders",
                                {
                                  amount: item.price * 100,
                                  currency: "INR",
                                },
                                {
                                  headers: {
                                    Authorization: authHeader,
                                    "Content-Type": "application/json",
                                  },
                                }
                              )
                              .then((response) => {
                                var options = {
                                  currency: "INR",
                                  key: "rzp_test_2jvYUT4uSx76mh",
                                  name: "Spark Faces",
                                  prefill: {
                                    email: "gaurav.kumar@example.com",
                                    contact: "9191919191",
                                    name: "Gaurav Kumar",
                                  },
                                  theme: { color: "#a82b27" },
                                };
                                options.order_id = response.data.id;
                                RazorpayCheckout.open(options)
                                  .then((data) => {
                                    AsyncStorage.getItem("token")
                                      .then((token) => {
                                        console.log(
                                          {
                                            package_id: item.id,
                                            payment_status: "paid",
                                            payment_type: "razorpay",
                                            txn_id: data.razorpay_payment_id,
                                            transaction_detail: data.razorpay_order_id,
                                          },
                                          JSON.parse(token)
                                        );
                                        axios
                                          .post(
                                            baseUrl + "subscribe-package",
                                            {
                                              package_id: item.id,
                                              payment_status: "paid",
                                              payment_type: "razorpay",
                                              txn_id: JSON.stringify(data.razorpay_payment_id),
                                              transaction_detail: JSON.stringify(
                                                data.razorpay_order_id
                                              ),
                                            },
                                            {
                                              headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${JSON.parse(token)}`,
                                              },
                                            }
                                          )
                                          .then((res) => {
                                            console.log("Success", res);
                                          })
                                          .catch((err) => {
                                            console.log("Failed", err, err.response.data);
                                          });
                                      })
                                      .finally(() => {
                                        AsyncStorage.clear().finally(() => {
                                          navigation.dispatch(
                                            CommonActions.reset({
                                              index: 0,
                                              routes: [{ name: "Login" }],
                                            })
                                          );
                                        });
                                        // console.log({
                                        //   package_id: item.id,
                                        //   payment_status: "paid",
                                        //   payment_type: "razorpay",
                                        //   txn_id: data.razorpay_payment_id,
                                        //   token: JSON.parse(token),
                                        //   transaction_detail:
                                        //     data.razorpay_order_id,
                                        // });
                                      });
                                  })
                                  .catch((error) => {
                                    AsyncStorage.clear().finally(() => {
                                      navigation.dispatch(
                                        CommonActions.reset({
                                          index: 0,
                                          routes: [{ name: "Login" }],
                                        })
                                      );
                                    });
                                  });
                              })
                              .catch((error) => {
                                toast("Failed to collect payment.", ToastAndroid.SHORT);
                                console.log("Failed to create order", error);
                              });
                          }}
                        >
                          <Text style={styles.SubBtn}>Select & Pay</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={{ flexDirection: "row", alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ padding: 40, fontSize: 18 }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Subscription;
