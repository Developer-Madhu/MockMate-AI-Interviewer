// import React from "react";
// import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <ul className="footer-links">
//         <li><a href="#home">Home</a></li>
//         <li><a href="#overview">Overview</a></li>
//         <li><a href="#features">Features</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//       <br />
//       <p>&copy; 2025 MockMate - All rights reserved.</p>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import "../Navbar/Navbar.css";

const Footer = () => {
  return (
    <header className="navbar">
      <div className="containersnav">
        {/* Logo with Bulb Icon */}
        <a href="#" className="logo">
          
          <span className="logo-text">MockMate</span>
        </a>

        {/* Navigation Links */}
        <nav className="nav-links">
          <p>&copy; 2025 MockMate - All rights reserved.</p>
        </nav>
      </div>
    </header>
  );
};

export default Footer;
