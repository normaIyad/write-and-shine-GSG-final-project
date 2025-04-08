import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '@/types/types';

interface UserContextType {
  isLogin: boolean;
  userData?: CustomPayload;
  setIsLogin: (login: boolean) => void;
  setUserData: (data?: CustomPayload) => void;
  logout: () => void;
}
const defaultContextValue: UserContextType = {
  isLogin: false,
  userData: undefined,
  setIsLogin: () => {},
  setUserData: () => {},
  logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultContextValue);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<CustomPayload | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomPayload>(token);
        setUserData(decodedToken);
        localStorage.setItem("userData", JSON.stringify(decodedToken) );
        setIsLogin(true);
        console.log(userData);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("userToken");
        setIsLogin(false);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userToken");
    setIsLogin(false);
    setUserData(undefined);
  };
  useEffect(() => {
    console.log("User data updated:", userData);
  }, [userData]);

  return (
    <UserContext.Provider value={{ isLogin, userData, setIsLogin, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
export { UserContext };