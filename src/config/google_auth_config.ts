import Constants from "expo-constants";

const googleAuthConfig = {
  expoClientId: Constants.manifest?.extra?.google?.expoClientId ?? "",
  androidClientId: Constants.manifest?.extra?.google?.androidClientId ?? "",
  iosClientId: Constants.manifest?.extra?.google?.iosClientId ?? "",
};

export default googleAuthConfig;
