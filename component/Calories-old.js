import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import styles from '../styleSheet/mainStyle';
import { List } from 'react-native-paper';
import { CaloriesData, CalOverViewData } from './DataApi/Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Calories = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <StatusBar />
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <Text style={{ flex: 10, height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
            Calories
          </Text>
        </View>
      </View>
      {/* Header */}

      <ScrollView style={styles.scrollView}>
        <View style={{ margin: 10, }}>
          <View>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: '500' }}>Overview</Text>
            <View style={{ padding: 10, }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 6 }}>
                  <Text style={styles.OverTitle}>Net Calories</Text>
                  <Text style={styles.OverDisc}>0 Calories</Text>
                </View>
                <View style={{ flex: 6 }}>
                  <Text style={styles.OverTitle}>Target Calories</Text>
                  <Text style={styles.OverDisc}>2228/Day</Text>
                </View>
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.OverTitle}>AIM</Text>
                <Text style={styles.OverDisc}>Mild Weight Loss</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DietGuidelines");
            }}>
            <View style={{ flexDirection: 'row', flex: 1, borderRadius: 10, padding: 10, borderColor: '#ccc', borderWidth: 1, backgroundColor: '#eee', width: 170, marginBottom: 20, }}>
              <Text style={{ fontSize: 16, color: '#000', }}>Diet Guidelines *</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={'#000'} />
            </View>
          </TouchableOpacity>
          <List.AccordionGroup style={{ backgroundColor: 'red' }}>
            {CaloriesData?.map((item, index) => {
              return (
                <List.Accordion key={index} title={item.CalTitle} id={item.id} style={{ backgroundColor: '#eee', marginBottom: 5, borderRadius: 10, }}>
                  <Text style={{ padding: 10 }}>
                    {item.CalDiscription}
                  </Text>
                </List.Accordion>
              )
            })}
          </List.AccordionGroup>
        </View>
      </ScrollView>

    </View>
  )
}

export default Calories