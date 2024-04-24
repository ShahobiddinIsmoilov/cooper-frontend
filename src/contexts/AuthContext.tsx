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
import { FaCheckCircle } from "react-icons/fa";

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
  const [showLogin, setShowLogin] = useState(true);
  const [loginMessage, setLoginMessage] = useState<React.ReactNode>(
    <p className="text-2xl text-center">Welcome back</p>
  );
  const [showRegisterButton, setShowRegisterButton] = useState(true);

  async function register(userData: {}) {
    try {
      await makeRequest("/api/user/register/", {
        method: "post",
        data: userData,
      });
      setShowLogin(true);
      setShowRegisterButton(false);
      setLoginMessage(
        <div className="flex flex-col items-center text-2xl">
          <FaCheckCircle size={40} className="text-green-400" />
          <p className="text-green-400">Account created successfully</p>
          <p> You can now log in</p>
        </div>
      );
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
    showLogin: showLogin,
    setShowLogin: setShowLogin,
    loginMessage: loginMessage,
    setLoginMessage: setLoginMessage,
    showRegisterButton: showRegisterButton,
    setShowRegisterButton: setShowRegisterButton,
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
