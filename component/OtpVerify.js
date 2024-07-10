import react, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styleSheet/mainStyle";
import OtpTextInput from 'react-native-text-input-otp'

const OtpVerify = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [otp, setOtp] = useState('');
  return (
    <View>
      <View style={styles.LoginTop}>
        <Text style={styles.LoginTopText}>Verification Code</Text>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 18, margin: 30, marginBottom: 10, color: '#777' }}>We have send the code verification {"\n"} to
        <Text style={{ fontWeight: '500', paddingLeft: 2 }}>&nbsp; prashant@gmail.com</Text>
      </Text>
      <View>
        <TouchableOpacity
          style={{ flexDirection: "row", alignSelf: "center", marginBottom: 20, }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: '#000', fontSize: 16, }}>Change Email Id?</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <SafeAreaView style={{ alignItems: "center" }}>
          <View style={{ width: '80%', margin: 30, }}>
            <OtpTextInput
              otp={otp}
              setOtp={setOtp}
              digits={4}
            />
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", alignSelf: "center" }}
            onPress={() => {
              navigation.navigate("Subscription");
            }}
          >
            <Text style={styles.loginBtn}>Verify OTP</Text>
          </TouchableOpacity>
        </SafeAreaView>

      </ScrollView>
    </View>
  );
};

export default OtpVerify;
