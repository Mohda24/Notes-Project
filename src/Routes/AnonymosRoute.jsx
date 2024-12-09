import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/usAuth";

const AnonymosRoute = () => {
    const {isAuthenticated}=useAuth();
    return isAuthenticated ? <Navigate to="/" replace/> : <Outlet/>
}

export default AnonymosRoute