import {
  Button,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styleSheet/mainStyle";
import Orientation from "react-native-orientation-locker";
import {
  HMSView,
  HMSSDK,
  HMSConfig,
  HMSUpdateListenerActions,
  HMSTrackType,
  HMSTrackUpdate,
  HMSVideoViewMode,
} from "@100mslive/react-native-hms";
import { useSelector } from "react-redux";
import { Renderfullscreen } from "./Renderfullscreen";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LVDetailsPage = (props) => {
  const { navigation } = props;
  const [config, setConfig] = useState(null);
  const hmsInstance = useSelector((state) => state.hmsInstance);
  const [trackId, setTrackId] = useState();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [newRoomId, setRoomId] = useState();
  const [roomCode, setroomCode] = useState();

  // Room Id
  const RoomId = props.route.params.RoomId;
  useEffect(() => {
    const getRoomID = async () => {
      if (RoomId) {
        try {
          const token = await AsyncStorage.getItem("sessiontoken");
          console.log(`https://api.100ms.live/v2/room-codes/room/${RoomId}`);
          const response = await axios.get(
            `https://api.100ms.live/v2/room-codes/room/${RoomId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const temp = response.data.data.filter((item) => {
            if (item.role === "viewer-realtime") {
              return true;
            }
          });
          setroomCode(temp[0].code);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getRoomID();
  }, [RoomId]);
  // Room Id

  useEffect(() => {
    if (roomCode) joinMeet();
  }, [roomCode]);

  const onJoinSuccess = (data) => {
    console.log("Joined room successfully", data);
    setIsFullScreen(true);
    setIsJoining(false);
  };

  const onTrackListener = (data) => {
    if (data.track.type !== HMSTrackType.VIDEO || data.track.mute === true)
      return;
    if (data.type === HMSTrackUpdate.TRACK_ADDED) {
      console.log("Adding track", data.track.trackId);
      setTrackId(data.track.trackId);
    }
    if (data.type === HMSTrackUpdate.TRACK_REMOVED) {
      console.log("Removing track", data.track.trackId);
      setTrackId(null);
      // dispatch(removeTrackId(data.track.trackId));
    }
  };
  const toggleFullScreen = () => {
    if (isFullScreen) {
      Orientation.unlockAllOrientations();
      StatusBar.setHidden(false);
    } else {
      StatusBar.setHidden(true);
    }
    setIsFullScreen(!isFullScreen);
  };

  const joinMeet = async () => {
    console.log("Joining meet");
    setIsJoining(true);
    try {
      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_JOIN,
        onJoinSuccess
      );
      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_TRACK_UPDATE,
        onTrackListener
      );
      hmsInstance.getAuthTokenByRoomCode(roomCode).then((data) => {
        hmsInstance.join({
          authToken: data,
          username: "User",
        });
      });
    } catch (e) {
      console.log("Error joining meet", e);
    }
  };

  useEffect(() => {
    return async () => {
      hmsInstance.removeEventListener(
        HMSUpdateListenerActions.ON_JOIN,
        onJoinSuccess
      );
      hmsInstance.removeEventListener(
        HMSUpdateListenerActions.ON_TRACK_UPDATE,
        onTrackListener
      );
      console.log("Leaving meet");
      await hmsInstance.leave();
      console.log("Leaving success");
    };
  }, []);

  return (
    <View style={styles.containerHome}>
      <View
        style={{
          backgroundColor: "black",
          height: "100%",
          width: "100%",
        }}
      >
        {trackId ? (
          <hmsInstance.HmsView
            trackId={trackId}
            style={{ height: "95%", width: "100%" }}
            scaleType={HMSVideoViewMode.ASPECT_FILL}
          />
        ) : (
          <View
            style={{
              backgroundColor: "#fff",
              height: "100%",
              paddingTop: "50%",
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                backgroundColor: "#fff",
                alignSelf: "center",
              }}
              source={require("../assets/comingsoon.gif")}
            />
          </View>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            padding: 15,
            width: "100%",
            // right: 25,
            // zIndex: 8,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            backgroundColor: "#ccc",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WeeklyVideo");
              //navigation.navigate("WeeklyVideo","Week1", { id: newRoomId.room_id });
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Click to Watch More Videos...
                {newRoomId?.map((item, number) => {
                  return (
                    <Text>
                      ({item.role} = {item.code}) ,{" "}
                    </Text>
                  );
                })}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LVDetailsPage;
