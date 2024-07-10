import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const image = {
  uri: "https://media.istockphoto.com/id/542197916/photo/running-on-treadmill.jpg?s=612x612&w=0&k=20&c=CYywmb71uOepSHWa534hG9230AzawSa4i3sA89o4qCQ=",
};

const Welcome = ({ navigation }) => {
  setTimeout(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (!token) {
        navigation.navigate("Login");
      } else {
        AsyncStorage.getItem("user").then((user) => {
          if (!user.is_subscribe) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Home");
          }
        });
      }
    });
  }, 1000);
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.text}>
          <Text style={styles.text1}>Welcome to</Text>
          <Text style={styles.text2}>SparkFace</Text>
          {/* <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {
                        navigation.navigate("Splash");
                    }}
                >
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Continue</Text>
                </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    height: "50%",
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#01010191",
    position: "absolute",
    width: "100%",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    bottom: 0,
    paddingTop: 60,
  },
  text1: {
    color: "white",
    fontSize: 32,
    lineHeight: 100,
    textAlign: "center",
  },
  text2: {
    color: "white",
    fontSize: 52,
    lineHeight: 65,
    fontWeight: "bold",
    textAlign: "center",
  },
  Button: {
    color: "#000",
    width: 300,
    padding: 15,
    height: 55,
    backgroundColor: "#fff",
    alignSelf: "center",
    margin: 20,
    marginTop: 70,
    borderRadius: 10,
    textAlign: "center",
  },
});
