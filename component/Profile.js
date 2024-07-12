import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from "react-native";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProfileData } from "./DataApi/Data";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

const Profile = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState();
  const [Loading, setLoading] = React.useState(true);
  useEffect(() => {
    const asynget = async () => {
      const user = await AsyncStorage.getItem("user");
      setUserProfile(JSON.parse(user));
      setLoading(false)
      console.log(user);
    }
    asynget();
  }, [])
  return (
    <View style={styles.containerProfile}>
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 11 }}>
            <Text style={{ textTransform: 'capitalize', height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              My Profile
            </Text>
          </View>

        </View>
      </View>
      {/* Header */}

      {Loading ?
        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator size="small" style={{ marginTop: '20%', }} />
          <Text style={{ marginTop: 10, }}>Please Wait...</Text>
        </View>
        :
        <View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ padding: 5, backgroundColor: '#eee', width: 100, height: 100, borderRadius: 50, margin: 8, marginLeft: 10 }}>
              <Image source={{ uri: `${userProfile?.profile_image}` }} style={{ width: 90, height: 90, borderRadius: 50, }}></Image>
            </View>
            <View style={{ padding: 8 }}>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>{userProfile?.first_name} {userProfile?.last_name}</Text>
              <Text style={{ marginTop: 2, marginBottom: 12 }}>{userProfile?.email}</Text>
              <TouchableOpacity style={{ flexDirection: 'row', }}
                onPress={() => {
                  navigation.navigate("ProfileUpdate", {
                    id: userProfile.id,
                  });
                }}
              >
                <Text style={{ padding: 6, marginTop: 4, paddingRight: 10, paddingLeft: 10, backgroundColor: '#eee', borderRadius: 5, color: '#000', borderColor: '#ccc', borderWidth: 1 }}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            <View style={{ marginTop: 10 }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                endFillColor="#000"
                overScrollMode="never">
                {ProfileData.map((item, number) => {
                  return (
                    <TouchableOpacity key={number.toString()}
                      onPress={() => {
                        navigation.navigate(item.link);
                      }}>
                      <View style={{ flexDirection: 'row', flex: 1, padding: 12, alignItems: 'center', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                        <MaterialCommunityIcons name={item.icon} size={20} color={'#777'} style={{ padding: 10, paddingRight: 15 }} />
                        <Text style={{ color: '#000', fontSize: 16, flex: 10, color: '#777' }}>{item.name}</Text>
                        {/* <Image source={require('../assets/next.png')} style={{ width: 14, height: 18, flex: 1 }}></Image> */}
                        <MaterialCommunityIcons name="chevron-right" size={24} color={'#999'} />
                      </View>
                    </TouchableOpacity>
                  )
                })}
                <TouchableOpacity
                  onPress={() => {
                    AsyncStorage.clear().then(() => {
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: "Login" }],
                        })
                      );
                    });
                  }}
                >
                  <View style={{ flexDirection: 'row', flex: 1, padding: 12, alignItems: 'center', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                    <MaterialCommunityIcons name="logout-variant" size={20} color={'#777'} style={{ padding: 10, paddingRight: 15 }} />
                    <Text style={{ color: '#000', fontSize: 16, flex: 10, color: '#777' }}>Log Out</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={'#999'} />
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      }
    </View>
  );
};

export default Profile;
