import React, {lazy} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './privateRoute';
import AnonymosRoute from './AnonymosRoute';

// lazy Pages
const Home = lazy(() => import("../pages/Home/HomePage"));
const Login = lazy(() => import("../pages/Login/Login"));
const NotFound = lazy(() => import("../pages/Not Found/NotFound"));

function AppRouter() {
    return (
        <div className='App'>
            <div className="container px-4 md:w-[85%] lg:w-[80%] mx-auto">
            <BrowserRouter>
            <Routes>
                <Route path='*' element={<NotFound/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/Home' element={<Home/>}/>
                </Route>
                <Route element={<AnonymosRoute/>}>
                    <Route path='/login' element={<Login/>}/>
                </Route>
            </Routes>
            </BrowserRouter>
            </div>
        </div>
)
}

export default AppRouter