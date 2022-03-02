import { User } from "firebase/auth";
import { createContext, useContext } from "react";

interface UserContextType {
  user?: User;
}

export const UserContext = createContext<UserContextType>({});

export const useUserContext = () => useContext(UserContext);
