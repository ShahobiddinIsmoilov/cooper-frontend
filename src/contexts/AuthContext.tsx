import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
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
    } catch (error: any) {
      return error;
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
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async function resetPassword(userData: {}) {
    try {
      await makeRequest("/api/user/reset-password/", {
        method: "put",
        data: userData,
      });
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
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
    resetPassword: resetPassword,
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
