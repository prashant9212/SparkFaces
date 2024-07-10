import { HMSVideoViewMode } from "@100mslive/react-native-hms";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import FullscreenSvg from "../assets/fullscreen.svg";
import { useSelector } from "react-redux";

export const Renderfullscreen = ({ trackId, toggleFullScreen }) => {
  const hmsInstance = useSelector((state) => state.hmsInstance);
  return (
    <View style={{ backgroundColor: "black", height: "100%", width: "100%" }}>
      <hmsInstance.HmsView
        trackId={trackId}
        style={{ height: "100%", width: "100%" }}
        scaleType={HMSVideoViewMode.ASPECT_FIT}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          padding: 8,
          // right: 25,
          // zIndex: 8,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            // margin: 10,
            // padding: 8,
            backgroundColor: "#fff",
            borderRadius: 5,
            elevation: 1,
            shadowColor: "#000",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WeeklyVideo");
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 8.5, fontSize: 16, fontWeight: "bold" }}>
                Jun Live Challenges
              </Text>
              <Text style={{ flex: 1.5, fontSize: 16, fontWeight: "bold" }}>
                ₹500
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              borderTopColor: "#eee",
              borderTopWidth: 1,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                paddingBottom: 10,
                fontSize: 14,
              }}
            >
              Introduction:
            </Text>
            <Text style={{ color: "#777", lineHeight: 20 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.{" "}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
