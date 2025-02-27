// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import Login from "../../Pages/Auth/Login";

// const Navbar = () => {
//   return (
//     <header className="navbar">
//       <div className="containersnav">
//         {/* Logo with Bulb Icon */}
//         <a href="#" className="logo">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M9 18h6" stroke="white" />
//             <path d="M10 22h4" stroke="white" />
//             <path
//               d="M12 2C7 2 4 6 4 10c0 2.5 1.5 4.5 3 6a4.8 4.8 0 0 1 1 3h8a4.8 4.8 0 0 1 1-3c1.5-1.5 3-3.5 3-6 0-4-3-8-8-8z"
//               stroke="white"
//             />
//           </svg>
//           <span className="logo-text">MockMate</span>
//         </a>

//         {/* Navigation Links */}
//         {/* <nav className="nav-links">
//           <a href="#">Blogs</a>
//           <a href="#">Second Link</a>
//           <a href="#">Third Link</a>
//           <a href="#">Fourth Link</a>
//         </nav> */}

//         {/* Button */}
//         <button className="nav-buttonss">
//         <Link to='/register'>Sign Up</Link>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Pages/Auth/AuthContext"; // Adjust the import path as needed

const Navbar = () => {
    const { isLoggedIn } = useAuth(); // Get the authentication state

    return (
        <header className="navbar">
            <div className="containersnav">
                {/* Logo with Bulb Icon */}
                <a href="#" className="logo">
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
                    <span className="logo-text">MockMate</span>
                </a>

                {/* Button */}
                {isLoggedIn ? (
                    // Show "Dashboard" link if the user is logged in
                    <button className="nav-buttonss">
                        <Link to="/dashboard">Dashboard</Link>
                    </button>
                ) : (
                    // Show "Sign Up" link if the user is not logged in
                    <button className="nav-buttonss">
                        <Link to="/login">Sign In </Link>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Navbar;