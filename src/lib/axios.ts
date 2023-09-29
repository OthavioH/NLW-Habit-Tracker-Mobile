import axios from "axios";

import Constants from "expo-constants";

const { manifest } = Constants;

const apiURL = "https://nlwhabittrackerbackend.onrender.com";

export const api = axios.create({
  baseURL: apiURL,
});
