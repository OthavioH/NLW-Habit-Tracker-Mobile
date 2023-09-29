import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthStackRoutes } from "./authStack.routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setUserAction from "../redux/actions/setUserAction";
import IUserInfo from "../shared/models/UserInfo";

export function Routes() {
  const user = useSelector((state: RootState) => state.user).user;

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("@user");
      const parsedUser = (await JSON.parse(user ?? "")) as IUserInfo;
      dispatch(setUserAction(parsedUser));
    })();
  }, []);

  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        {user ? <AppRoutes /> : <AuthStackRoutes />}
      </NavigationContainer>
    </View>
  );
}
