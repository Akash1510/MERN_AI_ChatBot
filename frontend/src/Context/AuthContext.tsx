import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, forgotPassword, loginUser,logoutUser,signupUser } from "../Helpers/Api_Comminication.tsx";
import { TfiRulerAlt } from "react-icons/tfi";


type User = {
  name:string
  email:string;
};

type UserAuth = {
  isLoggedIn:boolean;
  user:User | null;
  login:(email:string,password:string)=>Promise<void>;
  signup:(name:string,email:string,password:string)=>Promise<void>;
  logout:()=>Promise<void>; 
  forgot:(email:string)=>Promise<void>;
};


const AuthContext = createContext<UserAuth | null>(null);


export const AuthProvider = ({children}:{children:ReactNode})=>{
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
        const checkStatus = async () => {
            try {
                const data = await checkAuthStatus();
                if (data) {
                    setUser({ email: data.email, name: data.name });
                    setisLoggedIn(true);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                // Handle the error (e.g., display an error message to the user)
            }
        };
    
        checkStatus();
  }, []);
    

      const login = async(email:string,password:string)=>{

        const data =  await loginUser(email,password);
        if(data){
          setUser({email:data.email,name:data.name});
          setisLoggedIn(true);

        }

      }
      const signup = async(name:string,email:string,password:string)=>{
           const data = await signupUser(name,email,password);
           if(data){
            setUser({email:data.email,name:data.name});
            setisLoggedIn(true);
        
           }
      }

      const logout = async()=>{
       const check =  await logoutUser();
       if(check){
         setisLoggedIn(false);
         setUser(null);
        }
   }

   const forgot = async(email:string)=>{
    const use = await forgotPassword(email);
    console.log(use);
  

   }
      const value = {
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        forgot
      };
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      
};

export const UseAuth = ()=>useContext(AuthContext);

