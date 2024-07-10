import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { Platform, ToastAndroid } from "react-native";
import { Snackbar } from "react-native-paper";
import Toast from "react-native-simple-toast";

export const toast = (message) => {
  Toast.show(message);
};
