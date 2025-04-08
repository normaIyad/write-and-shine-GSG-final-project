import { create } from "zustand";
import {jwtDecode} from "jwt-decode"; 
import { CustomPayload } from "@/types/types";

interface UserState {
  isLogin: boolean;
  userData?: CustomPayload;
  setLoginFromToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => {
   const token = localStorage.getItem("userToken");
  let initialLoginState = false;
  let initialUserData: CustomPayload | undefined = undefined;

  if (token) {
    try {
      initialUserData = jwtDecode<CustomPayload>(token);
      initialLoginState = true;
    } catch (err) {
      console.error("Invalid token in localStorage:", err);
      localStorage.removeItem("userToken");
    }
  }

  return {
    isLogin: initialLoginState,
    userData: initialUserData,

    setLoginFromToken: (token) => {
      try {
        const decoded = jwtDecode<CustomPayload>(token);
        localStorage.setItem("userToken", token);
        set({ isLogin: true, userData: decoded });
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("userToken");
        set({ isLogin: false, userData: undefined });
      }
    },

    logout: () => {
      localStorage.removeItem("userToken");
      set({ isLogin: false, userData: undefined });
    },
  };
});
