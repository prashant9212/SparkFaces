// App.js
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./config/redux/store";
import Navigations from "./component/Navigations";
import Orientation from "react-native-orientation-locker";
import {
  HMSView,
  HMSSDK,
  HMSConfig,
  HMSUpdateListenerActions,
  HMSTrackType,
  HMSTrackUpdate,
  HMSVideoViewMode,
} from "@100mslive/react-native-hms";
import {
  addTrackId,
  removeTrackId,
  setHmsInstance,
} from "./config/redux/actions";
import axios from "axios";
import { baseUrl } from "./config/config";

const HMSComponent = () => {
  const dispatch = useDispatch();
  const trackIds = useSelector((state) => state.trackIds);

  const onError = (data) => {
    console.log("Error", data);
  };

  useEffect(() => {
    console.log("Track IDs", trackIds);
  }, [trackIds]);

  useEffect(() => {
    const init = async () => {
      Orientation.lockToPortrait();
      console.log("Initializing HMS instance");
      try {
        const hms = await HMSSDK.build();
        dispatch(setHmsInstance(hms));

        hms.addEventListener(HMSUpdateListenerActions.ON_ERROR, onError);

        return () => {
          hms.removeEventListener(HMSUpdateListenerActions.ON_ERROR, onError);
          hms.leave();
        };
      } catch (error) {
        console.error("Error initializing HMS instance:", error);
      }
    };
    init();
  }, []);

  return null;
};

// const App = () => (
//   <Provider store={store}>
//     <>
//       <StatusBar style="light" />
//       <Navigations />
//       <HMSComponent />
//     </>
//   </Provider>
// );

export default function App() {
  return (
    <Provider store={store}>
      <>
        <StatusBar style="light" />
        <Navigations />
        <HMSComponent />
      </>
    </Provider>
  );
}
