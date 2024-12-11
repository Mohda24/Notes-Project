import React from 'react'
import Lottie from 'lottie-react'
import Error from "../Animation/Error Toast/Error.json";
import Success from "../Animation/Valid Toast/Valid1.json";
import { useNotification } from '../Hooks/useNotification';

function Toast() {
    const {notification}=useNotification();
    
    
    const Animation=notification.type==="error"?Error:Success;
    return (
        <div id='Toast' className={`px-8 py-4 z-[99999] fixed select-none top-4 rounded-md right-[100%] invisible opacity-0 flex items-center gap-2 ${notification.type === "error" ? "bg-gradient-to-r from-red-500 to-red-700 shadow-lg shadow-red-500/50" : "bg-gradient-to-r from-green-400 to-green-800 shadow-lg shadow-green-500/50"} ${notification.show && "animate-shoWToast"} `}>
            <div className={`Animation ${notification.type==="error" ? "w-32 h-32 absolute  left-[-30px] top-[-34px]" :"w-[50px] h-[50px] absolute left-3" }  `}>
                <Lottie animationData={Animation} 
                aria-labelledby="Alert Notification Animation"
                loop={1}
                style={{ width: '100%', height: '100%' }}
                
                />
            </div>
            <p className={`text-white text-xl ms-8`}>{notification.message}</p>
        </div>
    );
}
export default Toast;