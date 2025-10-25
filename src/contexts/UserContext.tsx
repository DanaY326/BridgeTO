import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types/UserTypes';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  role: UserRole;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    setUser,
    role: user ? user.role : UserRole.NOT_LOGGED_IN,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};