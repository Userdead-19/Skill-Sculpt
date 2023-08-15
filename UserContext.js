import { createContext, useState } from "react";

const Usertype = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  return (
    <usertype.Provider value={{ userId, setUserId }}>
      {children}
    </usertype.Provider>
  );
};

export { Usertype, UserContext };
