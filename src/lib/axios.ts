import axios from "axios";

import Constants from "expo-constants";

const { manifest } = Constants;

export const api = axios.create({
  baseURL: `http://192.168.15.4:3333`,
});
