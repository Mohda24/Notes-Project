import { useEffect, useState,useContext,createContext } from "react";
import axios from "axios";


const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [isAuthenticated, setIsAuthenticated]=useState(false);
    const [loading, setLoading]=useState(false);
    const Api_url='https://notes.devlop.tech/api';

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            setIsAuthenticated(true);
        }
    },[])

    const login= async ({cin,password})=>{
        setLoading(true);
        try{
            const response=await axios.post(Api_url+"/login",{
                cin,
                password
            },{
                headers:{
                    'Content-Type':'application/json'

                }
            });
            const StatusSuccesfuly=response.status==200;
            if(StatusSuccesfuly){
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('userName',response.data.user.first_name);
                setIsAuthenticated(true);
            }
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }      
    }

    const logout= async ()=>{
            
            try{
                const token=localStorage.getItem('token');
                if(!token)setIsAuthenticated(false);
                const response=await axios.post(Api_url+"/logout",{},{
                    headers:{
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                
                if(response.status==200){
                    localStorage.removeItem("token");
                    setIsAuthenticated(false)
            }
            }catch(error){
                console.log(error);
            }
    }
    return (
        <AuthContext.Provider value={{isAuthenticated,loading,login,logout,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth=()=>useContext(AuthContext);