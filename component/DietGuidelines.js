import { Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styleSheet/mainStyle'
import { DiabeticFoods, NonVegFoods, VegFoods } from './DataApi/Data';
import { StatusBar } from 'expo-status-bar';

const DietGuidelines = ({ navigation }) => {
    return (
        <View style={styles.containerHome}>
            <StatusBar />
            {/* Header */}
            <View style={styles.DashboardHeader}>
                <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
                    <View style={{ flex: 8 }}>
                        <Text style={{ height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
                            Diet Guidelines
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
                <View style={{ elevation: 1, shadowColor: "#000", backgroundColor: '#fff', width: '96%', marginStart: '2%', marginTop: '2%', marginBottom: '0%', borderRadius: 20, paddingBottom: 0, padding: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 10, fontSize: 17, padding: 11, paddingBottom: 3, color: '#000', fontWeight: '500' }}>
                            Veg Food
                        </Text>
                    </View>
                    <View style={{ borderRadius: 10, paddingBottom: 10, }}>
                        <View style={{ flexDirection: 'row', }}>
                            <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                endFillColor="#000"
                                overScrollMode="never">
                                {VegFoods.map((data, number) => {
                                    return (
                                        <View key={number.toString()}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("{data.page}");
                                                }}>
                                                <Image style={styles.DietGuidelines} source={require('../assets/vegFood.jpg')}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View>

                <View style={{ elevation: 1, shadowColor: "#000", backgroundColor: '#fff', width: '96%', marginStart: '2%', marginTop: '2%', marginBottom: '0%', borderRadius: 20, paddingBottom: 0, padding: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 10, fontSize: 17, padding: 11, paddingBottom: 3, color: '#000', fontWeight: '500' }}>
                            Non Veg Food
                        </Text>
                    </View>
                    <View style={{ borderRadius: 10, paddingBottom: 10, }}>
                        <View style={{ flexDirection: 'row', }}>
                            <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                endFillColor="#000"
                                overScrollMode="never">
                                {NonVegFoods.map((data, number) => {
                                    return (
                                        <View key={number.toString()}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("{data.page}");
                                                }}>
                                                <Image style={styles.DietGuidelines} source={require('../assets/nonVeg.jpg')}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View>

                <View style={{ elevation: 1, shadowColor: "#000", backgroundColor: '#fff', width: '96%', marginStart: '2%', marginTop: '2%', marginBottom: '0%', borderRadius: 20, paddingBottom: 0, padding: 5, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 10, fontSize: 17, padding: 11, paddingBottom: 3, color: '#000', fontWeight: '500' }}>
                            Diabetic Food
                        </Text>
                    </View>
                    <View style={{ borderRadius: 10, paddingBottom: 10, }}>
                        <View style={{ flexDirection: 'row', }}>
                            <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                endFillColor="#000"
                                overScrollMode="never">
                                {DiabeticFoods.map((data, number) => {
                                    return (
                                        <View key={number.toString()}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("{data.page}");
                                                }}>
                                                <Image style={styles.DietGuidelines} source={require('../assets/DiabeticFood.jpg')}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default DietGuidelines

