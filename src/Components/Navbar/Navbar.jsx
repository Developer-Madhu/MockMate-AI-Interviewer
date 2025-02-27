// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { useAuth } from "../../Pages/Auth/AuthContext"; // Adjust the import path as needed

// const Navbar = () => {
//     const { isLoggedIn } = useAuth(); // Get the authentication state

//     return (
//         <header className="navbar">
//             <div className="containersnav">
//                 {/* Logo with Bulb Icon */}
//                 <a href="#" className="logo">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="icon"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                         <path d="M9 18h6" stroke="white" />
//                         <path d="M10 22h4" stroke="white" />
//                         <path
//                             d="M12 2C7 2 4 6 4 10c0 2.5 1.5 4.5 3 6a4.8 4.8 0 0 1 1 3h8a4.8 4.8 0 0 1 1-3c1.5-1.5 3-3.5 3-6 0-4-3-8-8-8z"
//                             stroke="white"
//                         />
//                     </svg>
//                     <span className="logo-text">MockMate</span>
//                 </a>

//                 {/* Button */}
//                 {isLoggedIn ? (
//                     // Show "Dashboard" link if the user is logged in
//                     <button className="nav-buttonss">
//                         <Link to="/dashboard">Dashboard</Link>
//                     </button>
//                 ) : (
//                     // Show "Sign Up" link if the user is not logged in
//                     <button className="nav-buttonss">
//                         <Link to="/login">Sign In </Link>
//                     </button>
//                 )}
//             </div>
//         </header>
//     );
// };

// export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Pages/Auth/AuthContext"; // Adjust the import path as needed

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth(); // Get the authentication state and logout function
    const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

    return (
        <header className="text-white py-4 px-6 flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <a href="#" className="flex items-center text-lg font-bold">
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 18h6" stroke="white" />
                        <path d="M10 22h4" stroke="white" />
                        <path
                            d="M12 2C7 2 4 6 4 10c0 2.5 1.5 4.5 3 6a4.8 4.8 0 0 1 1 3h8a4.8 4.8 0 0 1 1-3c1.5-1.5 3-3.5 3-6 0-4-3-8-8-8z"
                            stroke="white"
                        />
                    </svg>
                    <span className="ml-2 text-black">MockMate</span>
                </a>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex text-black space-x-6">
                <Link to="/dashboard" >Dashboard</Link>
                <Link to="/interview" >Practice</Link>
                {isLoggedIn ? (
                    <button onClick={logout} className="hover:text-red-400">Log Out</button>
                ) : (
                    <Link to="/login" className="hover:text-yellow-400">Sign In</Link>
                )}
            </nav>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col items-center space-y-4 py-4 md:hidden">
                    <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
                    <Link to="/practice" className="hover:text-yellow-400">Practice</Link>
                    {isLoggedIn ? (
                        <button onClick={logout} className="hover:text-red-400">Log Out</button>
                    ) : (
                        <Link to="/login" className="hover:text-yellow-400">Sign In</Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
