import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { OurBlogs } from "./DataApi/Data";
import { baseUrl } from "../config/config";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const DietFoodsDetails = ({ navigation }) => {
    const route = useRoute();
    const id = route.params.id;
    useEffect(() => {
        const id = route.params.id;
    }, [route.params]);

    const [dietFoodDetails, setDietFoodDetails] = useState();
    useEffect(() => {
        axios.post(baseUrl + 'diet-detail', {
            "id": id
        }).then((res) => {
            setDietFoodDetails(res.data.data);
            console.log(res.data.data)
        });
    }, []);


    return (
        <View style={styles.containerHome}>
            <StatusBar />
            {/* Header */}
            <View style={styles.DashboardHeader}>
                <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
                    <View style={{ flex: 8 }}>
                        <Text style={{ height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
                            Diet Food Details
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

            <ScrollView style={styles.scrollView}>
                <View style={{ margin: '2%', padding: 8, width: '96%', minHeight: 600, elevation: 1, shadowColor: "#000", backgroundColor: '#fff', borderRadius: 10 }}>
                    <Image style={styles.BlogImg} source={{ uri: `${dietFoodDetails?.diet_image}` }}></Image>
                    <Text style={{ padding: 10, fontSize: 20, fontWeight: '500', marginTop: 10, marginBottom: 10 }}>
                        {dietFoodDetails?.title}
                    </Text>
                    <View style={{ borderTopColor: '#eee', borderTopWidth: 1, paddingTop: 10, paddingBottom: 10, }}>
                        <Text style={{ fontWeight: 'bold', padding: 10, }}>Ingredients:</Text>
                        <Text style={{ padding: 10, fontSize: 16, color: '#777', lineHeight: 22, textAlign: 'justify' }}>
                            {dietFoodDetails?.ingredients}
                        </Text>
                    </View>
                    <View style={{ borderTopColor: '#eee', borderTopWidth: 1, paddingTop: 10, }}>
                        <Text style={{ fontWeight: 'bold', padding: 10, }}>Description:</Text>
                        <Text style={{ padding: 10, fontSize: 16, color: '#777', lineHeight: 22, textAlign: 'justify' }}>
                            {dietFoodDetails?.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
};

export default DietFoodsDetails;
