"use client"

import { usePathname } from "next/navigation";
import { api, endpoints } from "../config/server";
import { useRouter } from "next/navigation";

const { createContext, useState, useEffect } = require("react");
 

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [top3DataSources, setTop3DataSources] = useState(null)
  const [loading, setLoading] = useState(null);
  const [auth, setAuth] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

const [presentResumeData, setPresentResumeData] = useState(null)
  useEffect( () => {
   async function fetchUser(){
    const token = localStorage.getItem("token");
 
    if (token) {

      await api.post(endpoints.verifyAuth, {}, {
        headers: {
          "Content-Type": "application/json",
          "teddy-real-token": `${token}`,
        },
      })
        .then((response) => {
          const base = {...response.data.user,...{
            datasources:response.data.data_sources,
            resume_history:response.data.resume_history
           }}
           setUser(base);  
    
 
           localStorage.setItem('user', JSON.stringify(base));
          setAuth(true);
            setLoading(false);
        })
        .catch((error) => {
 
          console.error("Token verification error:", error);
          setUser(null);
          setAuth(false);
        })
       
    } else {
      setLoading(false);
    }
   }
    fetchUser()
  }, []);
  useEffect(() => {
    if (pathname === "/") {
      if (auth) {
        router.push("/");
      } else {
        router.push("/login");
      }
    }else if(pathname==='/login' || pathname==='/register'){
      if(auth){
        router.push('/')
      }
    }

    
  }
  , [auth]);
 
  return (
    
    <AppContext.Provider value={{ user, loading,auth,setAuth,setUser,loading,presentResumeData, setPresentResumeData,top3DataSources, setTop3DataSources }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;