import { useEffect, useState } from "react";
import IUserInfo from "../../models/UserInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuthentication() {
  const [user, setUser] = useState<IUserInfo>();

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem("@user");

      const userLogged = userStorage ? JSON.parse(userStorage) : null;

      setUser(userLogged);
    }

    loadUserStorageData();
  }, []);

  return user;
}
