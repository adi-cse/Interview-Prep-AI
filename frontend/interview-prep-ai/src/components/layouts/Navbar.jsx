import React from 'react';
import ProfileInfoCard from '../../components/Cards/ProfileInfoCard';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-30">
            <div className="container mx-auto flex items-center justify-between px-4 md:px-6 h-full">
                
                <Link to="/dashboard">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight hover:text-indigo-600 transition-colors duration-200">
                        Interview Prep AI
                    </h2>
                </Link>

                <div className="flex items-center">
                    <ProfileInfoCard />
                </div>

            </div>
        </div>
    )
}

export default Navbar;
