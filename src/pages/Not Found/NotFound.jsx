import React from 'react'
import Lottie from "lottie-react";
import notFoundANimation from "../../Animation/not Found/notFound.json";
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className='h-screen flex flex-col items-center justify-center '>
            <div className="notFoundPage w-1/2 max-w-md mx-auto">
                <Lottie animationData={notFoundANimation} />
            </div>
            <div className="text-center mt-2">
                <h1 className="text-6xl font-extrabold text-white">404</h1>
                <p className="text-xl text-white opacity-70 mt-4">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="text-primary-500 mt-6 px-4 py-2 inline-block text-lg font-medium border border-secondaryCard-bg rounded-full hover:bg-secondaryCard-bg hover:text-black duration-300 ">Go Back Home</Link>
            </div>
        </main>
    )
}

export default NotFound