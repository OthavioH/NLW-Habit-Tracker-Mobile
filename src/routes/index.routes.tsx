import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { AuthStackRoutes } from "./authStack.routes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function Routes() {
  const user = useSelector((state: RootState) => state.user).user;

  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        {user ? <AppRoutes /> : <AuthStackRoutes />}
      </NavigationContainer>
    </View>
  );
}
