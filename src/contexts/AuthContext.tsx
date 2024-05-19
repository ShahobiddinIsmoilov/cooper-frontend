import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { FaRegCheckCircle } from "react-icons/fa";
import { notifications } from "@mantine/notifications";
import { AuthContextProps } from "../interfaces/authContextProps";
import { makeRequest } from "../services/makeRequest";

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuthContext() {
  return useContext(AuthContext) as AuthContextProps;
}

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")!)
      : null
  );

  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens")!)
      : null
  );

  const [loading, setLoading] = useState(true);

  async function register(userData: {
    username: string;
    password: string;
    phone: string;
  }) {
    try {
      await makeRequest("/api/user/register/", {
        method: "post",
        data: userData,
      });
      const loginData = {
        username: userData["username"],
        password: userData["password"],
      };
      notifications.show({
        message: "Account created succesfully",
        icon: <FaRegCheckCircle color="white" />,
        style: {
          backgroundColor: "green",
        },
        autoClose: 5000,
      });
      login(loginData);
    } catch {
      console.log("Shit's gone downhill in register function bruh");
    }
  }

  async function login(userData: {}) {
    try {
      const response = await makeRequest("/api/user/token/", {
        method: "post",
        data: userData,
      });
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("authTokens", JSON.stringify(response.data));
    } catch {
      console.log("Login function is having a stroke");
    }
  }

  function logout() {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  }

  const contextData = {
    user: user,
    authTokens: authTokens,
    registerUser: register,
    loginUser: login,
    logoutUser: logout,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
