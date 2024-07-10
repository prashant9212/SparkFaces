import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { OurBlogs } from "./DataApi/Data";
import { baseUrl } from "../config/config";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

const BlogDetails = ({ navigation }) => {
    const route = useRoute();
    const id = route.params.id;
    const [Loading, setLoading] = useState(true);
    const [blogsDetails, setBlogsDetails] = useState();

    const regex = /(<([^>]+)>)/ig;

    const [userToken, setMainToken] = useState();
    useEffect(() => {
        const BlogFun = async () => {
            if (userToken) {
                try {
                    const response = await axios.post(baseUrl + "post-detail", {
                        "id": id
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userToken}`,
                        },
                    });
                    const AllBlogDetailsData = response.data.data;
                    console.log("All Blog Data", AllBlogDetailsData);
                    setBlogsDetails(AllBlogDetailsData);
                    setLoading(false);                    
                } catch (error) {
                    console.log("Blog Details Error", error);
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
                            Blog Details
                        </Text>
                    </View>
                    <View style={{ flex: 2, alignSelf: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Blogs");
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
                <ScrollView style={styles.scrollView}>
                    <View style={{ margin: '2%', padding: 8, width: '96%', minHeight: 600, elevation: 1, shadowColor: "#000", backgroundColor: '#fff', borderRadius: 10 }}>
                        <Image style={styles.BlogImg} source={{ uri: `${blogsDetails?.post_image}` }}></Image>
                        <Text style={{ padding: 10, fontSize: 18, fontWeight: '500' }}>
                            {blogsDetails?.title}
                        </Text>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ borderRadius: 50, marginTop: 2, width: 35, height: 35, marginLeft: 5, padding: 5, backgroundColor: '#eee', alignSelf: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="account" size={24} style={{ color: '#777' }} />
                                </View>
                            </View>
                            <View style={{ flex: 5, paddingLeft: 15, }}>
                                <Text style={{ fontSize: 14, fontWeight: '500' }}>Admin</Text>
                                <Text style={{ fontSize: 12, color: '#777' }}>{blogsDetails?.datetime}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ padding: 15, fontSize: 16, color: '#777', lineHeight: 22, textAlign: 'justify' }}>
                                {blogsDetails?.description.replace(regex, '')}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            }
        </View>
    );
};

export default BlogDetails;
