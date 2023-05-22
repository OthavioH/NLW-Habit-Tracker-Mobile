import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";

import * as Google from "expo-auth-session/providers/google";
import IUserInfo from "../shared/models/UserInfo";
import googleAuthConfig from "../config/google_auth_config";

import GoogleLogo from "../assets/googlelogo.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../lib/axios";
import { useDispatch } from "react-redux";
import setUserAction from "../redux/actions/setUserAction";

export default function SignInScreen() {
  const [request, response, promptAsync] =
    Google.useAuthRequest(googleAuthConfig);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await handleSignInWithGoogle();
    })();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user && response?.type === "success") {
      const { authentication } = response;
      await getUserData(authentication?.accessToken as string);
    }
  }

  async function getUserData(accessToken: string) {
    if (!accessToken) return;

    try {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const user = await userInfoResponse.json();
      const findOrCreateUserResponse = await api.post("/users", user);

      await AsyncStorage.setItem(
        "@user",
        JSON.stringify(findOrCreateUserResponse.data)
      );

      dispatch(setUserAction(findOrCreateUserResponse.data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="w-full flex-1 flex-col items-center justify-center bg-background px-8 pt-16">
      <Image
        source={require("../assets/icon.png")}
        className="w-32 h-32 rounded-lg mb-8"
      />
      <TouchableHighlight
        onPress={() => promptAsync({ useProxy: true, showInRecents: false })}
      >
        <View className="w-fit flex-row align-center justify-center bg-white p-2 rounded">
          <GoogleLogo width={30} height={30} />
          <Text className="text-lg ml-2 font-semibold text-center">
            Sign in with Google
          </Text>
        </View>
      </TouchableHighlight>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  habitsIcon: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginBottom: 16,
  },
});
