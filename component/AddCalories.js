import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';

const AddCalories = ({ navigation }) => {
    return (
        <View>
            {/* Header */}
            <View style={styles.DashboardHeader}>
                <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
                    <View style={{ flex: 8 }}>
                        <Text style={{ textTransform: 'capitalize', height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
                            Add Calories
                        </Text>
                    </View>
                    <View style={{ flex: 2, alignSelf: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("CaloriesSearch");
                            }}>
                            <MaterialCommunityIcons name="home" size={24} style={{ color: '#000' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* Header */}
            <View style={{ flexDirection: 'row', margin: 15, }}>
                <View style={{ flex: 3 }}>
                    <Image source="" style={styles.AddCalImg}></Image>
                </View>
                <View style={{ flex: 5 }}>
                    <Text style={styles.addCalTitle}>Calories</Text>
                    <Text style={styles.addCalDis}>224 cals/cup</Text>
                    <Text style={styles.addCalTitle}>Carbohydrates</Text>
                    <Text style={styles.addCalDis}>10.7 gm</Text>
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={styles.addCalTitle}>Fat</Text>
                    <Text style={styles.addCalDis}>18.6 gm</Text>
                    <Text style={styles.addCalTitle}>Proten</Text>
                    <Text style={styles.addCalDis}>7.1 gm</Text>
                </View>
            </View>
            <View style={{ margin: 15, }}>
                <Text style={{ color: '#777' }}>Select The Serving Quantity</Text>
                <Text>Cup (250)</Text>
            </View>
            <View style={{ width: 350, backgroundColor: "#fff", margin: 15, borderRadius: 5, borderColor: '#ccc', borderWidth: 1 }}>
                <Text style={{ width: 350, }}>
                    <TextInput
                        keyboardType='default'
                        style={{ width: 350, backgroundColor: '#fff' }}
                        placeholder="Number of Serving"
                    />
                </Text>
            </View>
            <View style={{ margin: 10 }}>
                <TouchableOpacity
                    style={{ marginTop: 0, backgroundColor: '#000', borderRadius: 5, alignItems: 'center', padding: 15, width: '94%', margin: '2%' }}
                    onPress={() => {
                        navigation.navigate("Calories");
                    }}>
                    <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Add to Journal</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddCalories