import react, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styleSheet/mainStyle";
import axios from "axios";
import React from "react";
import { baseUrl } from "../config/config";
import { toast } from "./common/toast";


const Register = ({ navigation }) => {
    const [first_name, setFirstName] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmailid] = React.useState("");
    const [phone_number, setPhone] = React.useState("");
    const [password, setPass] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");


    const handleSubmit = async () => {
        const Formdata = {
            first_name, last_name, username, email, phone_number, password
        };
        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if (first_name.length < 2 || first_name.length > 20) {
            toast("First name must be between 2 and 20 characters!");
            return;
        }
        if (last_name.length < 2 || first_name.length > 20) {
            toast("Last name must be between 2 and 20 characters!");
            return;
        }
        if (username.length < 2 || first_name.length > 20) {
            toast("User name must be between 2 and 20 characters!");
            return;
        }
        if (email.length < 5 || email.length > 20) {
            toast("Email must be between 5 and 20 characters!");
            return;
        }
        if (!validateEmail(email)) {
            toast("Invalid email format!");
            return;
        }
        if (phone_number.length !== 10) {
            toast("Mobile Number must be 10 Digit");
            return;
        }
        if (password.length < 5 || password.length > 20) {
            toast("Password must be between 5 and 20 characters!");
            return;
        }
        if (password !== confirmPassword) {
            toast("Passwords do not match");
            return;
        }

        axios
            .post(baseUrl + 'register', Formdata)
            .then((response) => {
                console.log(response);
                toast("User Register Successfully! Please Login");
                navigation.navigate("Login")
            })
            .catch((error) => {
                console.log(error);
                toast("Error" + " " + error);
            });
    };

    return (
        <View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                endFillColor="#000"
                overScrollMode="never">
                <View style={styles.RegisterTop}>
                    <Text style={styles.RegisterTopText}>User Registration</Text>
                </View>
                {/* <Text style={styles.RegisterTopText1}>Enter User Details!</Text> */}
                <View style={{ paddingTop: 20, }}>
                    <SafeAreaView style={{ alignItems: "center" }}>
                        <TextInput
                            style={styles.LoginInput}
                            placeholder={"Enter First Name"}
                            value={first_name}
                            onChangeText={setFirstName}
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.LoginInput}
                            placeholder={"Enter Last Name"}
                            value={last_name}
                            onChangeText={setLastName}
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.LoginInput}
                            placeholder={"Enter Username"}
                            value={username}
                            onChangeText={setUsername}
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.LoginInput}
                            placeholder={"Enter Email ID"}
                            value={email}
                            onChangeText={setEmailid}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.LoginInput}
                            placeholder={"Enter Phone Number"}
                            value={phone_number}
                            onChangeText={setPhone}
                            maxLength={10}
                            keyboardType="number-pad"
                        />
                        <TextInput
                            style={styles.LoginInput}
                            placeholder={"Enter Password"}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={setPass}
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.LoginInput}
                            placeholder={"Confirm Password"}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            keyboardType="default"
                        />
                    </SafeAreaView>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignSelf: "center" }}
                    onPress={() => {
                        handleSubmit();
                    }}
                >
                    <Text style={styles.RegisterBtn}>Register</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignSelf: "center", marginTop: 30, }}>
                    <Text style={{ paddingTop: 5, fontSize: 15, color: "#777" }}>Already User? </Text>
                    <TouchableOpacity style={{ alignSelf: "center", }}
                        onPress={() => {
                            navigation.navigate("Login");
                        }}>
                        <Text style={{ padding: 5, color: '#000', fontSize: 15 }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
};


export default Register;


