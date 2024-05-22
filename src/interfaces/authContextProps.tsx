interface UserProps {
  user_id: number;
  username: string;
}

export interface AuthContextProps {
  user: UserProps | null;
  setUser: (e: any) => void;
  registerUser: (e: any) => void;
  loginUser: (userData: {}) => void;
  resetPassword: (userData: {}) => void;
  logoutUser: () => void;
  setAuthTokens: (e: any) => void;
  authTokens: {
    access: string;
    refresh: string;
  };
}
