import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { OurBlogs } from './DataApi/Data'
import styles from '../styleSheet/mainStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { baseUrl } from '../config/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from 'react-native-paper';
const Blogs = ({ navigation }) => {
  const [Loading, setLoading] = useState(true);
  const [allBlogs, setBlogs] = useState();
  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const BlogFun = async () => {
      if (userToken) {
        try {
          const response = await axios.get(baseUrl + "post-list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          });
          const AllBlogData = response.data.data;
          console.log("All Blog Data", AllBlogData);
          setLoading(false);
          setBlogs(AllBlogData);
        } catch (error) {
          console.log("Blog All Error", error);
          setLoading(true);
        }
      }
    };
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    }
    BlogFun();
    asynget11();
  }, [userToken]);

  return (
    <View style={styles.containerHome}>
      <StatusBar />
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 8 }}>
            <Text style={{ height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              Our Blogs
            </Text>
          </View>
          <View style={{ flex: 2, alignSelf: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}>
              <MaterialCommunityIcons name="home" size={24} style={{ color: '#000' }} />
            </TouchableOpacity>
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
        <ScrollView>
          <View style={{ width: '96%', marginStart: '2%', marginTop: '2%', borderRadius: 20, paddingBottom: 0, padding: 0, }}>
            {allBlogs?.map((data, number) => {
              return (
                <View key={number.toString()} style={{ marginBottom: 10, padding: 8, elevation: 1, shadowColor: "#000", backgroundColor: '#fff', width: '100%', borderRadius: 10 }}>
                  <Text style={{ padding: 10, fontSize: 18, fontWeight: '500' }}>{data.title}</Text>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, }}>
                    <View style={{ flex: 1, }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("BlogDetails", { id: data.id });
                        }}>
                        <View style={{ borderRadius: 50, marginTop: 2, width: 35, height: 35, marginLeft: 5, padding: 5, backgroundColor: '#eee', alignSelf: 'center', alignItems: 'center' }}>
                          <MaterialCommunityIcons name="account" size={24} style={{ color: '#777' }} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 5, paddingLeft: 15, }}>
                      <Text style={{ fontSize: 14, fontWeight: '500' }}>Admin</Text>
                      <Text style={{ fontSize: 12, color: '#777' }}>{data.datetime}</Text>
                    </View>
                    <View style={{ flex: 3, marginBottom: 15, alignSelf: 'center', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("BlogDetails", { id: data.id });
                        }}>
                        <View>
                          <Text style={{ padding: 8, paddingLeft: 12, paddingRight: 12, color: '#fff', borderRadius: 20, fontSize: 12, fontWeight: '500', backgroundColor: '#000' }}>Read More</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Image style={styles.BlogImg} source={{ uri: `${data.post_image}` }}></Image>
                </View>
              )
            })}
          </View>
          <View>

          </View>
        </ScrollView>
      }
    </View>
  )
}

export default Blogs