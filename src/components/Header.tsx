import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";

import HabitsLogo from "../assets/headerlogo.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import logOutUserAction from "../redux/actions/logOutUserAction";

export function Header() {
  const { navigate } = useNavigation();

  const dispatch = useDispatch();

  async function logoutUser() {
    await AsyncStorage.removeItem("@user");
    dispatch(logOutUserAction());
  }

  return (
    <View className="w-full flex-row items-center justify-between">
      <HabitsLogo />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
        onPress={() => navigate("new")}
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />

        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-red-500 rounded-lg items-center"
        onPress={logoutUser}
      >
        <Feather name="log-out" color={colors.red[500]} size={20} />
      </TouchableOpacity>
    </View>
  );
}
