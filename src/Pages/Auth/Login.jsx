// import React, { useState } from "react";
// import axios from "axios";
// import './Login.css'

// const Login = () => {
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:3000/login", formData);

//       if (res.data && res.data.token) {
//         console.log("User logged in:", formData);
//         localStorage.setItem("token", res.data.token);
//         setFormData({ username: "", password: "" });
//         setMessage("Login successful!");
//       } else {
//         setMessage("Login failed. Please check your credentials.");
//       }
//     } catch (e) {
//       console.error(e);
//       if (e.response && e.response.data) {
//         setMessage(e.response.data.message || "Something went wrong!");
//       } else {
//         alert("Something went wrong!");
//       }
//     }
//   };

//   return (
//     <div className="ring">
//       <i style={{ "--clr": "#00ff0a" }}></i>
//       <i style={{ "--clr": "#ff0057" }}></i>
//       <i style={{ "--clr": "#fffd44" }}></i>
//       <div className="login">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="inputBx">
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </div>
//           <br />
//           <div className="inputBx">
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <br />
//           <div className="inputBx">
//             <input type="submit" value="Sign in" />
//           </div>
//         </form>
//         {message && <p>{message}</p>}
//         <div className="links">
//           <a href="#">Forgot Password</a>
//           <a href="#">Signup</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useAuth } from "./AuthContext"; // Assuming this manages authentication state

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // Custom auth hook to store user session

    // ✅ Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages

        try {
            // 🔹 Send login request to the backend
            const res = await axios.post(
                "http://localhost:1001/login",
                formData,
                { withCredentials: true } // Ensures cookies are sent & received
            );

            console.log("Server Response:", res.data); // Debugging

            if (res.data.success) {
                console.log("User logged in:", res.data.user)
                // 🔹 Store user data in context (No localStorage needed)
                login(res.data.token, res.data.user);

                // 🔹 Redirect to dashboard
                navigate("/dashboard");
            } else {
                setMessage(res.data.msg || "Login failed!");
            }
        } catch (error) {
            setMessage("Something went wrong! Please try again.");
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="ring">
            <div className="login">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputBx">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <div className="inputBx">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    <div className="inputBx">
                        <input type="submit" value="Sign in" />
                    </div>
                </form>
                {message && <p>{message}</p>}
                <div className="links">
                    <a href="#">Forgot Password</a>
                    <a href="/register">Signup</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
