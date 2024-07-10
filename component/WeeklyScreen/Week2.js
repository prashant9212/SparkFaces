import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Week1Data } from "../DataApi/Data";
import styles from "../../styleSheet/mainStyle";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const Week2 = ({ navigation, route }) => {
  const recordingData = route.params.initialParams;

  return (
    <View style={styles.containerHome}>
      <ScrollView>
        {recordingData.length > 0 ? (
          <View>
            {recordingData?.map((recording, number, index) => {
              return (
                <View key={number.toString()}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(recording.id);
                      navigation.navigate("M3U8Player", { id: recording.id });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        height: 90,
                        marginLeft: 8,
                        marginRight: 8,
                        marginTop: 8,
                        padding: 5,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        elevation: 1,
                        shadowColor: "#000",
                      }}
                    >
                      <View style={{ flex: 7, padding: 5 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "500",
                            paddingBottom: 5,
                          }}
                        >
                          Day {number + 1}
                        </Text>
                        <Text>Video Duration: {Math.ceil(recording.duration / 60)} Min</Text>
                        {/* <Text>{item.disc}</Text> */}
                      </View>
                      <View style={{ flex: 2 }}>
                        <Image
                          style={{ width: 80, height: 80, borderRadius: 5 }}
                          source={require("../../assets/liveVideo.jpg")}
                        ></Image>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={{ padding: 10, textAlign: "center", width: "100%", fontSize: 18 }}>
            No data found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Week2;
