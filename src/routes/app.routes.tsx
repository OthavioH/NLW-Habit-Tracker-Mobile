import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { HomeScreen } from "../screens/Home";
import { NewHabitScreen } from "../screens/New";
import { HabitScreen } from "../screens/Habit";

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={HomeScreen} />
      <Screen name="new" component={NewHabitScreen} />
      <Screen name="habit" component={HabitScreen} />
    </Navigator>
  );
}
