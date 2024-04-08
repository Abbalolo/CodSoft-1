import { createContext, useState, ReactNode, useEffect } from "react";
import { url } from "../ApiUrl";
import axios from "axios";

type User = {
  _id: any;
  username: string;
  userId: string;
  email: string
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

type UserContextProviderProps = {
  children: ReactNode;
};




export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

 const getUser = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/auth/refetch`, {
        withCredentials: true,
      });
      setUser(res.data);
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
