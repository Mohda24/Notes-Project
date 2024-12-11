import React,{useState,useRef,useEffect} from 'react'
import { useAuth } from '../../Hooks/usAuth'
import Loading from '../../Animation/loading'
import useOnScreen from '../../Hooks/useOnScreen'
import Toast from '../../component/toast'
import { useNotification } from '../../Hooks/useNotification'
import { use } from 'react'

function Login() {
    const {notification,setNotification}=useNotification();
    const {loading,login,userName,error}=useAuth();
    const ref=useRef();
    const isVisible=useOnScreen(ref);
    const [user,setUser]=useState({
        cin:"",
        password:""
    })
    const handleLoading=(e)=>{
        e.preventDefault()
        login(user);
        console.log(userName);
    
    }
    useEffect(()=>{
        setNotification((prev)=>({...prev,isHomePage:true}))
    },[])
    return (
        <main className='min-h-screen flex items-center justify-center'>
            {/* notification */}
            {notification.isHomePage && <Toast/>}
            <div
            ref={ref}
            className={`login bg-primary-color w-96 rounded-md shadow-lg p-8 opacity-0 translate-y-4 ${isVisible && "animate-fadeIn"}`}>
                <h1 
                style={{animationDelay:"0.1s"}}
                className={`text-4xl font-extrabold leading-[1.7] text-center opacity-0 translate-y-3 ${isVisible && "animate-fadeIn"}`}>Welcome 😁🎉</h1>
                <p
                style={{animationDelay:"0.2s"}}
                className={`text-opacity-60 font-normal text-center text-xl opacity-0 translate-y-[-12px] ${isVisible && "animate-fadeIn"}`}>Sign in to your account</p>
                <form
                onSubmit={handleLoading}
                className='mt-10 flex flex-col items-center gap-[20px]'>
                    <input
                    value={user.cin}
                    onChange={(e)=>setUser({...user,cin:e.target.value})}
                    className={`w-full duration-300 ease-in bg-transparent border border-[#ffffff27] py-2 px-6 rounded placeholder:text-[#ffffff4e] ${error ?"outline-1 outline-red-600 outline":""}`} type="text" placeholder="Your Cin" />
                    <input
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                    className={`w-full duration-300 ease-in bg-transparent border border-[#ffffff27] py-2 px-6 rounded placeholder:text-[#ffffff4e] ${error ?"outline-1 outline-red-600 outline":""}`} type="password" placeholder="Your Password" />
                    <button
                    className='relative bg-secondaryCard-bg w-full py-2 px-4 rounded text-black text-lg mt-5 font-normal hover:opacity-85 duration-300 ease-linear min-h-[44px]'>
                        {loading ? <Loading color={"#000000"} style={{width:"50px",margin:"auto"}}/>  : "Sign In"}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Login 