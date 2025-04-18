'use client';
import { createContext, useContext, useState, ReactNode } from "react";

type User = {
    name: string;
    email: string;
    phoneNumber: string;
  }

type UserContextType = {
  selectedUser: User | undefined;
  setSelectedUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};
