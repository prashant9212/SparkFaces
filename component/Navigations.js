
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Login from '../component/Login';
import Dashboard from '../component/Dashboard';
import Register from '../component/Register';
import Profile from '../component/Profile';
import Home from '../component/Home';
import Offers from '../component/Offers';
import Chart from '../component/Chart';
import Workout from './Workout';
import Calories from './Calories';
import LVDetailsPage from './LVDetailsPage';
import WeeklyVideo from './WeeklyVideo';
import Week1 from './WeeklyScreen/Week1';
import Week2 from './WeeklyScreen/Week2';
import Week3 from './WeeklyScreen/Week3';
import Subscription from './Subscription';
import WODetailsPage from './WODetailsPage';
import DietGuidelines from './DietGuidelines';
import MyPrograms from './MyPrograms';
import Blogs from './Blogs';
import BlogDetails from './BlogDetails';
import OtpVerify from './OtpVerify';
import DietFoodsDetails from './DietFoodsDetails';
import MyProgramsDetails from './MyProgramsDetails';
import M3U8Player from './M3U8Player';
import MyLive from './MyLive';
import CaloriesSearch from './CaloriesSearch';
import AddCalories from './AddCalories';
import ProfileUpdate from './ProfileUpdate';
import Welcome from './Welcome';
import MyProgramWeek from './MyProgramWeek';
import MyProgramWeekSingle from './MyProgramWeekSingle';
import MyProgramsDetailsVideo from './MyProgramsDetailsVideo';
import CaloriesSearchAdd from './CaloriesSearchAdd';
import CaloriesEdit from './CaloriesEdit';
import CaloriesQuestion from './CaloriesQuestion';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Offers"
          component={Offers}
          options={{ title: "Offers" }}
        />
        <Stack.Screen
          name="Chart"
          component={Chart}
          options={{ title: "Chart" }}
        />
        <Stack.Screen
          name="WeeklyVideo"
          component={WeeklyVideo}
          options={{ title: "WeeklyVideo" }}
        />
        <Stack.Screen
          name="Week1"
          component={Week1}
          options={{ title: "Week1" }}
        />
        <Stack.Screen
          name="Week2"
          component={Week2}
          options={{ title: "Week2" }}
        />
        <Stack.Screen
          name="Week3"
          component={Week3}
          options={{ title: "Week3" }}
        />
        <Stack.Screen
          name="Workout"
          component={Workout}
          options={{ title: "Workout" }}
        />
        <Stack.Screen
          name="Calories"
          component={Calories}
          options={{ title: "Calories" }}
        />
        <Stack.Screen
          name="MyPrograms"
          component={MyPrograms}
          options={{ title: "MyPrograms" }}
        />
        <Stack.Screen
          name="LVDetailsPage"
          component={LVDetailsPage}
          options={{ title: "LVDetailsPage" }}
        />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{ title: "Subscription" }}
        />
        <Stack.Screen
          name="WODetailsPage"
          component={WODetailsPage}
          options={{ title: "WODetailsPage" }}
        />
        <Stack.Screen
          name="DietGuidelines"
          component={DietGuidelines}
          options={{ title: "DietGuidelines" }}
        />
        <Stack.Screen
          name="Blogs"
          component={Blogs}
          options={{ title: "Blogs" }}
        />
        <Stack.Screen
          name="BlogDetails"
          component={BlogDetails}
          options={{ title: "BlogDetails" }}
        />
        <Stack.Screen
          name="MyProgramsDetails"
          component={MyProgramsDetails}
          options={{ title: "MyProgramsDetails" }}
        />
        <Stack.Screen
          name="OtpVerify"
          component={OtpVerify}
          options={{ title: "OtpVerify" }}
        />
        <Stack.Screen
          name="DietFoodsDetails"
          component={DietFoodsDetails}
          options={{ title: "DietFoodsDetails" }}
        />
        <Stack.Screen
          name="M3U8Player"
          component={M3U8Player}
          options={{ title: "M3U8Player" }}
        />
        <Stack.Screen
          name="MyLive"
          component={MyLive}
          options={{ title: "MyLive" }}
        />
        <Stack.Screen
          name="CaloriesSearch"
          component={CaloriesSearch}
          options={{ title: "CaloriesSearch" }}
        />
        <Stack.Screen
          name="AddCalories"
          component={AddCalories}
          options={{ title: "AddCalories" }}
        />
        <Stack.Screen
          name="ProfileUpdate"
          component={ProfileUpdate}
          options={{ title: "ProfileUpdate" }}
        />
        <Stack.Screen
          name="MyProgramWeek"
          component={MyProgramWeek}
          options={{ title: "MyProgramWeek" }}
        />
        <Stack.Screen
          name="MyProgramWeekSingle"
          component={MyProgramWeekSingle}
          options={{ title: "MyProgramWeekSingle" }}
        />
        <Stack.Screen
          name="MyProgramsDetailsVideo"
          component={MyProgramsDetailsVideo}
          options={{ title: "MyProgramsDetailsVideo" }}
        />
        <Stack.Screen
          name="CaloriesSearchAdd"
          component={CaloriesSearchAdd}
          options={{ title: "CaloriesSearchAdd" }}
        />
        <Stack.Screen
          name="CaloriesEdit"
          component={CaloriesEdit}
          options={{ title: "CaloriesEdit" }}
        />
        <Stack.Screen
          name="CaloriesQuestion"
          component={CaloriesQuestion}
          options={{ title: "CaloriesQuestion" }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigations;