// ios 85488617607-tdgbsgg5t3gnf1q81frdf3hq3ec6jqb0.apps.googleusercontent.com
// android 85488617607-1a7fpug90tjqq1lcoo9tmdbtd4nblq25.apps.googleusercontent.com
import "./src/lib/dayjs";

import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

import { Loading } from "./src/components/loading";
import { Routes } from "./src/routes/index.routes";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </Provider>
  );
}
