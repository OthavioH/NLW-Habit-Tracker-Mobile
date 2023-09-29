import Constants from "expo-constants";

const googleAuthConfig = {
  expoClientId: Constants.manifest?.extra?.expoClientId ?? "",
  androidClientId: Constants.manifest?.extra?.androidClientId ?? "",
  iosClientId: Constants.manifest?.extra?.iosClientId ?? "",
};

export default googleAuthConfig;
