interface UserProps {
  user_id: number;
  username: string;
}

export interface AuthContextProps {
  user: UserProps | null;
  setUser: (e: any) => void;
  registerUser: (e: any) => void;
  loginUser: (e: any) => void;
  logoutUser: () => void;
  setAuthTokens: (e: any) => void;
  authTokens: {
    access: string;
    refresh: string;
  };
  showLogin: boolean;
  setShowLogin: (value: boolean) => void;
  loginMessage: React.ReactNode;
  setLoginMessage: (value: React.ReactNode) => void;
  showRegisterButton: boolean;
  setShowRegisterButton: (value: boolean) => void;
}
