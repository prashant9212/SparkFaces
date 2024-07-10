import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, ScrollView } from "react-native";
import styles from "../styleSheet/mainStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProfileData } from "./DataApi/Data";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { toast } from "./common/toast";
import { baseUrl } from "../config/config";
import axios from "axios";
import { launchImageLibrary as _launchImageLibrary } from 'react-native-image-picker';
let launchImageLibrary = _launchImageLibrary;

const ProfileUpdate = ({ navigation }) => {
  const route = useRoute();
  const id = route.params.id;
  console.log("Main User Id: ", id)

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


  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    asynget11();
  }, [userToken]);

  // Image Picker
  const [selectedImage, setSelectedImage] = useState(null);
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };
  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  // Image Picker


  const [userid, setUserId] = useState(id);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(selectedImage);

  const UploadProfile = async () => {
    if (firstName.length < 2) {
      toast("Please enter first name");
      return;
    }
    if (lastName.length < 2) {
      toast("Please enter last name");
      return;
    }
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!validateEmail(email)) {
      toast("Invalid email format!");
      return;
    }
    if (mobile.length !== 10) {
      toast("Mobile number must be 10 digits", {
        progress: 0,
        progressStyle: { background: "#ff2424" }
      });
      return;
    }
    if (username.length < 2) {
      toast("Please enter user name");
      return;
    }
    if (!file) {
      toast("Please upload your photo");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", userid);
      formData.append("First_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phone_number", mobile);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("profile_image", file);

      axios
        .post(baseUrl + 'update-profile', formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          toast("User Profile Update Successfully!");
          navigation.navigate("Profile")
        })
        .catch((error) => {
          console.log(error);
          toast("Error" + " " + error);
        });
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };


  return (
    <View style={styles.containerProfile}>
      {/* Header */}
      <View style={styles.DashboardHeader}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignContent: 'center' }}>
          <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}>
              <MaterialCommunityIcons name="menu-left" size={44} style={{ color: '#000' }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 11 }}>
            <Text style={{ textTransform: 'capitalize', height: 45, fontSize: 18, marginTop: 14, paddingLeft: 20, color: '#000' }}>
              Update Profile
            </Text>
          </View>

        </View>
      </View>
      {/* Header */}
      <ScrollView>
        {Loading ?
          <View style={{ alignItems: 'center' }}>
            <ActivityIndicator size="small" style={{ marginTop: '20%', }} />
            <Text style={{ marginTop: 10, }}>Please Wait...</Text>
          </View>
          :
          <View>
            <View style={{ flexDirection: "row", marginTop: 5, }}>
              <View style={{ padding: 5, backgroundColor: '#eee', width: 100, height: 100, borderRadius: 50, margin: 8, marginLeft: '15%' }}>
                <Image source={{ uri: `${userProfile?.profile_image}` }} style={{ width: 90, height: 90, borderRadius: 50, }}></Image>
                <TouchableOpacity
                  onPress={openImagePicker}>
                  <MaterialCommunityIcons name="file-upload-outline" size={24} color={'#999'} />
                </TouchableOpacity>
              </View>
              <View style={{ padding: 5, backgroundColor: '#eee', width: 100, height: 100, borderRadius: 50, margin: 8, marginLeft: '15%' }}>
                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 90, height: 90, borderRadius: 50, }}
                    resizeMode="contain"
                  />
                )}
              </View>
            </View>

            <View style={{ margin: 15, marginTop: 50 }}>
              {/* <Text>{userid}</Text> */}
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder={userProfile?.first_name}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder={userProfile?.last_name}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={userProfile?.email}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                value={mobile}
                onChangeText={setMobile}
                placeholder={userProfile?.phone_number}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder={userProfile?.username}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TouchableOpacity
                onPress={() => {
                  UploadProfile();
                }}>
                <Text style={styles.ProfileUpBtn}>Update</Text>
              </TouchableOpacity>
            </View>

          </View>
        }
      </ScrollView>
    </View>
  );
};

export default ProfileUpdate;
