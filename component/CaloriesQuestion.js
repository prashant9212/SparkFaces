import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styleSheet/mainStyle';
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CaloriesQuestion = () => {
    const [height, setHeight] = React.useState("");
    const [age, setAge] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [fitness_level, setSelectedQ3] = React.useState("");
    const [goal_level, setSelectedQ4] = React.useState("");
    console.log(fitness_level + " | " + goal_level + " | " + gender + " | " + height + " | " + age + " | " + weight)

    const [userToken, setMainToken] = useState();
    useEffect(() => {
        const asynget11 = async () => {
            const MainToken = await AsyncStorage.getItem("token");
            setMainToken(JSON.parse(MainToken));
        };
        asynget11();
    }, [userToken]);


    const Question3 = [
        // { key: '1', value: 'Select Fitness Level', disabled: true },
        { key: '1.2', value: 'Sedentary (office job)' },
        { key: '1.375', value: 'Light Exercise (1-2 days/week)' },
        { key: '1.550', value: 'Moderate exercise (3-5 days/week)' },
        { key: '1.725', value: 'Heavy exercise ( 6-7 days/week)' },
        { key: '1.9', value: 'Athletic (2x per day)' },
    ]
    const Question4 = [
        // { key: '1', value: 'Select Fitness Level', disabled: true },
        { key: '0.8', value: 'Fast weight loss (80% cals/day)', },
        { key: '0.9', value: 'Mild weight loss (90% cals/day)' },
        { key: '1', value: 'Maintain weight' },
        { key: '1.1', value: 'Mild weight gain (110% cals/day)', },
        { key: '1.2', value: 'Fast weight gain (120% cals/day)' },
    ]
    const genderData = [
        { key: '1', value: 'Male', },
        { key: '2', value: 'Female' },
    ]

    const handleSubmit = async () => {
        const Formdata = {
            height, weight, fitness_level, goal_level, gender, age
        };

        if (height.length < 1) {
            toast("Please enter height");
            return;
        }
        if (weight.length < 1) {
            toast("Please enter weight");
            return;
        }
        if (fitness_level.length < 1) {
            toast("Please select fitness level");
            return;
        }
        if (goal_level.length < 1) {
            toast("Please select Goal Level");
            return;
        }
        if (gender.length < 1) {
            toast("Please enter gender");
            return;
        }
        if (age.length < 1) {
            toast("Please enter age");
            return;
        }

        axios
            .post(baseUrl + 'target-calories', Formdata, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(userToken)}`,
                },
            })
            .then((response) => {
                console.log(response);
                toast("Data Successfully Sumbit");
                navigation.navigate("Calories")
            })
            .catch((error) => {
                console.log(error);
                toast("Error" + " " + error);
            });
    };

    return (
        <View style={styles.containerProfile}>
            <ScrollView>
                <View style={{ marginTop: 40, }}>
                    <View style={styles.MainQuestionBox}>
                        <View>
                            <Text style={styles.Question}>Q1. How tall are you?</Text>
                            <TextInput
                                value={height}
                                onChangeText={setHeight}
                                style={styles.Answer}
                                placeholder="In cms"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                    <View style={styles.MainQuestionBox}>
                        <View>
                            <Text style={styles.Question}>Q2. How much do you weigh?</Text>
                            <TextInput
                                value={weight}
                                onChangeText={setWeight}
                                style={styles.Answer}
                                placeholder="In kgs"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                    <View style={styles.MainQuestionBox}>
                        <View>
                            <Text style={styles.Question}>Q3. ⁠What is your current fitness level?</Text>
                            <View style={{ marginTop: 10 }}>
                                <SelectList
                                    setSelected={(val) => setSelectedQ3(val)}
                                    data={Question3}
                                    save="key"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.MainQuestionBox}>
                        <View>
                            <Text style={styles.Question}>Q4. What do you have in mind?</Text>
                            <View style={{ marginTop: 10 }}>
                                <SelectList
                                    setSelected={(val) => setSelectedQ4(val)}
                                    data={Question4}
                                    save="key"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.MainQuestionBox}>
                        <View>
                            <Text style={styles.Question}>Gender</Text>
                            <View style={{ marginTop: 10 }}>
                                <SelectList
                                    setSelected={(val) => setGender(val)}
                                    data={genderData}
                                    save="value"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.MainQuestionBox}>
                        <View>
                            <Text style={styles.Question}>Age</Text>
                            <TextInput
                                value={age}
                                onChangeText={setAge}
                                style={styles.Answer}
                                placeholder="Enter Your Age"
                                keyboardType="default"
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: "center", marginBottom: 20 }}
                        onPress={() => {
                            handleSubmit();
                        }}
                    >
                        <Text style={styles.RegisterBtn}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default CaloriesQuestion;