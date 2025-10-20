import { createContext, useEffect, useState } from "react";
import { userDetails } from "../services/apis/User";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token , setToken] = useState(localStorage.getItem("token") || null);
  const [signUpCredentials , setSignUpCredentials] = useState({})
  const expiryTime = localStorage.getItem("expiryTime");
  const fetchUserDetails = async () => {

    if(Date.now() > expiryTime){
      
      localStorage.removeItem("token");
      localStorage.removeItem("expiryTime");
    }

    const response = await userDetails();

    if (!response.success) {
      return console.log("User details not fetched", response);
    }
    
    setUser(response.user);
  };

  useEffect(() => {
    token ? fetchUserDetails() : "";
    
  }, [token]);


  return (
    <UserContext.Provider value={{ user , token , setToken ,signUpCredentials , setSignUpCredentials }}>
      {children}
    </UserContext.Provider>
  );
};
