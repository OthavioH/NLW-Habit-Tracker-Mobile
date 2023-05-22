import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import SignInScreen from "../screens/SignInScreen";

export function AuthStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="sign_in" component={SignInScreen} />
    </Navigator>
  );
}
