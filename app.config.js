import "dotenv/config";

export default {
  expo: {
    name: "Habit Tracker",
    slug: "habit-tracker",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "com.othavioh.habittracker",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#09090A",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.othavioh.habittracker",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#09090A",
      },
      package: "com.othavioh.habittracker",
      config: {
        intentFilters: [
          {
            action: "VIEW",
            data: [
              {
                scheme: "https",
                host: "nlwhabittrackerbackend.onrender.com",
              },
            ],
            category: ["BROWSABLE", "DEFAULT"],
          },
        ],
      },
    },
    platforms: ["ios", "android"],
    web: {
      favicon: "./assets/favicon.png",
    },
    updates: {
      url: "https://u.expo.dev/0d323f7a-77ab-4f0a-a32b-00646be886d8",
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
    extra: {
      eas: {
        projectId: "0d323f7a-77ab-4f0a-a32b-00646be886d8",
      },
      apiURL: process.env.API_URL,
      iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
      androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      expoClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
    },
  },
};
