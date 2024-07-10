import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Orientation from "react-native-orientation-locker";
import { ActivityIndicator } from "react-native-paper";
import Video from "react-native-video";
import { baseUrl } from "../config/config";

const MyProgramsDetailsVideo = ({ navigation }) => {
  const route = useRoute();
  const id = route.params.id;
  const [singleProgramVideo, setSingleProgramVideo] = useState('');
  const [singleProgramAllData, setSingleProgramAllData] = useState('');
  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const ProgramFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(
            baseUrl + `single_programmvideo?id=${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          const SingleProgramVideo = response.data.data.programm_video;
          const setSingleProgram = response.data.data;
          console.log("Sinlge Video Data", SingleProgramVideo);
          setSingleProgramVideo(SingleProgramVideo);
          setSingleProgramAllData(setSingleProgram);
        } catch (error) {
          console.log("Program Error", error);
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    ProgramFun();
    asynget11();
  }, [userToken]);

  return (
    <SafeAreaView style={styles.container}>
      {singleProgramVideo && (
        <Video
          source={{ uri: singleProgramVideo }}
          style={styles.video}
          controls={true}
          resizeMode="cover"
          onBuffer={onBuffer}
          onError={onError}
        // onFullscreenPlayerDidDismiss={() => {
        //     console.log("Full Screen");
        //     if (Platform.OS === "android") {
        //         Orientation.unlockAllOrientations();
        //     }
        // }}
        />
      )}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          padding: 10,
          width: "100%",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("");
            }}
            style={styles.ProgramThums}
          >
            <Text style={{ fontSize: 18, fontWeight: 500, color: 'green' }}><MaterialCommunityIcons name="thumb-up-outline" size={24} color={"green"} /> {singleProgramAllData.like === null ? (0) : (<Text>{singleProgramAllData?.like}</Text>)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("");
            }}
            style={styles.ProgramThums}
          >
            <Text style={{ fontSize: 18, fontWeight: 500, color: 'red' }}><MaterialCommunityIcons name="thumb-down-outline" size={24} color={"red"} /> {singleProgramAllData.dislike === null ? (0) : (<Text>{singleProgramAllData?.dislike}</Text>)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const onBuffer = (buffer) => {
  console.log("Buffering", buffer);
};

const onError = (error) => {
  //   console.log("Error", error);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // padding: 10,
    borderRadius: 8,
    // alignItems: "center",
    backgroundColor: "white",
  },
  video: {
    width: "100%",
    height: "100%",
    margin: 0,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  ProgramThums: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 2,
    paddingLeft: 18,
  }
});

export default MyProgramsDetailsVideo;
