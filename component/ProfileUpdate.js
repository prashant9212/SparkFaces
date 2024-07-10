import React, { useEffect, useMemo, useState } from "react";
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
    setFile(null);
    setSelectedImage(null);
    const asynget = async () => {
      const user = await AsyncStorage.getItem("user");
      setUserProfile(JSON.parse(user));

      setLoading(false)
      console.log(user);
    }
    asynget();
  }, [])

  useEffect(()=>{
    setEmail(userProfile?.email);
    setFirstName(userProfile?.first_name);
    setLastName(userProfile?.last_name);
    setMobile(userProfile?.phone_number);
    setUsername(userProfile?.username);
  },[userProfile])


  const [userToken, setMainToken] = useState();
  useEffect(() => {
    const asynget11 = async () => {
      const MainToken = await AsyncStorage.getItem("token");
      setMainToken(JSON.parse(MainToken));
    };
    asynget11();
  }, [userToken]);

  // Image Picker
  const [selectedImage, setSelectedImage] = useState();
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
      const { uri, type, fileName } = response.assets[0];
      setSelectedImage({ uri, type, name: fileName });
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
  const dummyImg=useMemo(()=>{
    if(selectedImage)
      return selectedImage.uri
    return userProfile?.profile_image
  },[selectedImage,userProfile])
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
    if (!dummyImg) {
      toast("Please upload your photo");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("profile_image", {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.name,
      });
      formData.append("id", userid);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phone_number", mobile);
      formData.append("username", username);
      formData.append("email", email);
      console.log(formData,userToken)
      axios
        .post(baseUrl + 'update-profile', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
          if(error&&error.response&&error.response.data&&error.response.data.message)
            {
              toast(error.response.data.message);
            }
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
              <MaterialCommunityIcons name="arrow-left" size={30} style={{ color: '#000' }} />
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
            <View style={{ flexDirection: "row",justifyContent:'center',alignItems:'center', marginTop: 5, }}>
              <View style={{flex:1,flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
              <View style={{ padding: 5, backgroundColor: '#eee', width: 100, height: 100, borderRadius: 50, margin: 8, marginLeft: '15%' }}>
                <Image source={ { uri: `${dummyImg}` }} style={{ width: 90, height: 90, borderRadius: 50, }}></Image>
              </View> 
                <TouchableOpacity
                style={{justifyContent:'center',flex:1,alignItems:'center',padding:10}}
                  onPress={openImagePicker}>
                  <Text>Upload New Image</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ margin: 15, marginTop: 50 }}>
              {/* <Text>{userid}</Text> */}
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder={"Name"}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder={"Last Name"}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={"Email"}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                value={mobile}
                onChangeText={setMobile}
                placeholder={"Mobile Number"}
                style={styles.ProfileUpInput}
              >
              </TextInput>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder={"User Name"}
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
