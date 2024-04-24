// Custom hook with an axios interceptor. Locally checks the expiration date
// every time before making a private request. If the access token is valid,
// axios sends it with every request. Otherwise, token refreshes.

import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../contexts/AuthContext";
import { makeRequest } from "./makeRequest";

// API baseURL
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function useCredentials() {
  // importing needed context values
  const { authTokens, setAuthTokens, setUser, logoutUser } = useAuthContext();

  // custom axios instance
  const axiosInstance: any = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
      "Content-Type": "multipart/form-data",
    },
  });

  // intercepting the request
  axiosInstance.interceptors.request.use(async (config: any) => {
    // decode access token and check the expiry
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp!).diff(dayjs()) < 1;

    // carry on with the request if valid
    if (!isExpired) return config;

    // otherwise, refresh the tokens
    try {
      // request to refresh the tokens
      const response = await makeRequest("/api/user/token/refresh/", {
        method: "post",
        data: {
          refresh: authTokens.refresh,
        },
      });

      // save the new tokens
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // attach the new access token to the request
      config.headers.Authorization = `Bearer ${response.data.access}`;

      // update authTokens and user states with the new tokens
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      // carry on with the request
      return config;
    } catch (err: any) {
      // if refresh token is expired, logout the user
      if (err.response.status === 401) {
        logoutUser();
      } else {
        console.log("Error in useCredentials");
      }
    }
  });

  return axiosInstance;
}
