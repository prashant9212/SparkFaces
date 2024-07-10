import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styleSheet/mainStyle";
import { useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MyProgramWeekSingle = ({ navigation }) => {
  const route = useRoute();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (route.params?.initialParams) {
      setData(route.params.initialParams);
      console.log(route.params);
    }
  }, [route.params]);

  const regex = /(<([^>]+)>)/ig;
  return (
    <View style={styles.containerHome}>
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  //console.log(recording.id);
                  navigation.navigate("MyProgramsDetailsVideo", {
                    id: item.id,
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    height: 'auto',
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
                        fontSize: 18,
                        fontWeight: "500",
                        paddingBottom: 7,
                      }}
                    >
                      {item.day}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        paddingBottom: 5,
                      }}
                    >
                      {item.title.replace(regex, '')}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("");
                        }}
                        style={styles.ProgramThums}
                      >
                        <Text style={{ fontSize: 12, fontWeight: 500, }}><MaterialCommunityIcons name="thumb-up-outline" size={14} /> {item.like === null ? (0) : (<Text>{item.like}</Text>)}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("");
                        }}
                        style={styles.ProgramThums}
                      >
                        <Text style={{ fontSize: 12, fontWeight: 500 }}><MaterialCommunityIcons name="thumb-down-outline" size={14} /> {item.dislike === null ? (0) : (<Text>{item.dislike}</Text>)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Image
                      style={{ width: 80, height: 80, borderRadius: 5 }}
                      source={{ uri: item.thumbnail }}
                    ></Image>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
};

export default MyProgramWeekSingle;
