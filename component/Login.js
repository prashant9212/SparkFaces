import react, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styleSheet/mainStyle";
import axios from "axios";
import { baseUrl } from "../config/config";
import { toast } from "./common/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("8802050387");
  // const [email, setEmail] = useState("1220011220");
  const [password, setPassword] = useState("123456");
  const [showPass, setShowPass] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const nav = useNavigation();
  return (
    <View>
      <View style={styles.LoginTop}>
        <Text style={styles.LoginTopText}>Login Page</Text>
      </View>
      <Text style={styles.LoginTopText1}>Welcome back !</Text>
      <ScrollView>
        <SafeAreaView style={{ alignItems: "center" }}>
          <TextInput
            value={email}
            style={styles.LoginInput}
            onChangeText={setEmail}
            placeholder="Enter Email or Mobile Number"
          />
          {validateEmail(email) && (
            <TextInput
              value={password}
              style={styles.LoginInput}
              onChangeText={setPassword}
              placeholder={"Enter Login Password"}
              secureTextEntry
            />
          )}
          {showPass && (
            <TextInput
              value={password}
              style={styles.LoginInput}
              onChangeText={setPassword}
              placeholder={"Enter OTP"}
            />
          )}
          <TouchableOpacity
            style={{ flexDirection: "row", alignSelf: "center" }}
            onPress={() => {
              if (!validateEmail(email) && email.length !== 10)
                toast("Invalid Email or Mobile Number");
              else {
                if (validateEmail(email)) {
                  if (password.length < 4) toast("Password too short.");
                  else
                    axios
                      .post(baseUrl + "login", {
                        email: email,
                        password: password,
                        user_type: "user",
                      })
                      .then(async (res) => {
                        await AsyncStorage.setItem(
                          "token",
                          JSON.stringify(res.data.data.api_token)
                        );
                        await AsyncStorage.setItem("user", JSON.stringify(res.data.data));
                        if (!res.data.data.is_subscribe) {
                          nav.navigate("Subscription");
                        } else {
                          nav.navigate("Home");
                        }
                      })
                      .catch((err) => {
                        console.log("emailpass error", err);
                        toast("Invalid Password");
                      });
                } else {
                  if (!showPass)
                    axios
                      .post(baseUrl + "login-with-otp", {
                        phone_number: email,
                      })
                      .then((res) => {
                        toast("Otp sent to " + email);
                      })
                      .catch((err) => {
                        if (err.response.status === 422) {
                          toast("Otp Send successfully");
                          setShowPass(true);
                        } else {
                          toast("Otp could not be sent.");
                          setShowPass(false);
                        }
                      });
                  else
                    axios
                      .post(baseUrl + "verify-otp-login", {
                        phone_number: email,
                        code: password,
                      })
                      .then((res) => {
                        if (res && res.data && res.status === 200) {
                          AsyncStorage.setItem("token", JSON.stringify(res.data.data.api_token))
                            .then(() => {
                              AsyncStorage.setItem("user", JSON.stringify(res.data.data))
                                .then(() => {
                                  if (!res.data.data.is_subscribe) {
                                    nav.navigate("Subscription");
                                  } else {
                                    nav.navigate("Home");
                                  }
                                })
                                .catch((err) => {
                                  console.log("err in setting user", err);
                                });
                            })
                            .catch((err) => {
                              console.log("err in setting token", err);
                            });
                        }
                      })
                      .catch((err) => {
                        toast("Invalid Otp.");
                        console.log(err, err.response.data, {
                          phone_number: email,
                          code: password,
                        });
                        setShowPass(false);
                      });
                }
              }
            }}
          >
            <Text style={styles.loginBtn}>{"Continue"}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 30 }}>
            <Text style={{ paddingTop: 5, fontSize: 15, color: "#777" }}>New User? </Text>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={{ padding: 5, color: "#000", fontSize: 15 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Login;
