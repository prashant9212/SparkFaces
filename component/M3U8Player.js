import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Orientation from "react-native-orientation-locker";
import { ActivityIndicator } from "react-native-paper";
import Video from "react-native-video";

const M3U8Player = (props) => {
  const [url, setUrl] = React.useState("");
  const id = props.route.params.id;
  const navigation = useNavigation();
  useEffect(() => {
    const getVideoUrl = async () => {
      if (id) {
        try {
          const token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTkxNDA1OTYsImV4cCI6MTcyMDM1MDE5NiwianRpIjoiYjdhZTRiNDctNjdhNy00MDljLTgyZTYtNjI3MjNmZWEyNjdiIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3MTkxNDA1OTYsImFjY2Vzc19rZXkiOiI2NjJhN2MxZWEzZjFjNGM2MGY0NjNiNTAifQ.Q4J18gTH1PamKxYTu1nLkM5qX2f7KNqE-QlBRV09b6M";
          console.log(id);
          console.log(`https://api.100ms.live/v2/recording-assets/${id}/presigned-url`);
          const response = await axios.get(
            `https://api.100ms.live/v2/recording-assets/${id}/presigned-url`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data.url);
          setUrl(response.data.url);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getVideoUrl();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View
        style={{
          elevation: 5,
          shadowColor: "#000",
          backgroundColor: "#fff",
          paddingTop: 40,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          borderColor: "#eee",
          borderWidth: 1,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              flex: 10,
              height: 45,
              fontSize: 18,
              marginTop: 14,
              paddingLeft: 20,
              color: "#000",
            }}
          >
            Back to Home
          </Text>
        </Pressable>
      </View> */}
      {url === "" ? (
         <View style={{ alignItems: 'center' }}>
         <ActivityIndicator size="small" style={{ marginTop: '20%', }} />
         <Text style={{ marginTop: 10, }}>Please Wait...</Text>
       </View>
      ) : (
        <Video
          source={{ uri: url }} // Can be a URL or a local file.
          style={styles.video}
          controls={true} // Display native playback controls.
          resizeMode="cover" // Set to contain for better fitting.
          onBuffer={onBuffer} // Callback when remote video is buffering.
          onError={onError} // Callback when video cannot be loaded.
          onFullscreenPlayerDidDismiss={() => {
            console.log("Full Screen");
            if (Platform.OS === "android") {
              Orientation.unlockAllOrientations();
            }
          }}
        // onFullscreenPlayerDidDismiss={() => {
        //   console.log("Exit Full Screen");
        //   if (Platform.OS === "android") {
        //     Orientation.unlockAllOrientations();
        //   }
        // }}
        />

      )}
    </SafeAreaView>
  );
};

const onBuffer = (buffer) => {
  console.log("Buffering", buffer);
};

const onError = (error) => {
  console.log("Error", error);
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
});

export default M3U8Player;
