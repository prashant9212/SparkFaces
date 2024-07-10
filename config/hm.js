import { HMSSDK } from "@100mslive/react-native-hms";

export const hmsInstance = async function () {
  try {
    const hms = await HMSSDK.build();
    return hms;
  } catch (error) {
    console.error("Error building HMS instance:", error);
    throw error;
  }
};
