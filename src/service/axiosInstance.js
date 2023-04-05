import axios from "axios";

const BASE_URL = "https://pbsolutions.dev/atina/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
