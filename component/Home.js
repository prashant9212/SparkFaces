import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Workout from './Workout';
import Calories from './Calories';
import MyPrograms from './MyPrograms';

const Tab = createMaterialBottomTabNavigator();
const Home = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            activeColor="#000"
            barStyle={{ backgroundColor: '#fff', height: 68, borderColor: '#eee', borderWidth: 1, }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={22} />
                    ),
                }}
            />
            <Tab.Screen
                name="Workout"
                component={Workout}
                options={{
                    tabBarLabel: 'Workout',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="motion-sensor" color={color} size={22} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calories"
                component={Calories}
                options={{
                    tabBarLabel: 'Calories',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="food" color={color} size={22} />
                    ),
                }}
            />

            <Tab.Screen
                name="Programs"
                component={MyPrograms}
                options={{
                    tabBarLabel: 'Programs',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="movie-play-outline" color={color} size={22} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={22} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default Home;