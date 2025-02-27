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
import React, { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useAuth } from "./AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth()

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("userData");

        // if (token || storedUser) {
        //     // Redirect to the interview page if the user is already logged in
        //     navigate("/dashboard", { state: { user: JSON.parse(storedUser) } });
        // }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post("http://localhost:3000/login", formData);

    //         if (res.data && res.data.token) {
    //             console.log("User logged in:", res.data.user);

    //             // Store user data and token in localStorage
    //             localStorage.setItem("token", res.data.token);
    //             localStorage.setItem("user", JSON.stringify(res.data.user));

    //             // Redirect to the interview page with user details
    //             navigate("/dashboard", { state: { user: res.data.user } });
    //         } else {
    //             setMessage("Login failed. Please check your credentials.");
    //         }
    //     } catch (e) {
    //         setMessage("Something went wrong!");
    //     }
    // };
    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("userData");
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", formData);
            console.log("Server Response:", res.data); // Log the response

            if (res.data && res.data.token) {
                console.log("User logged in:", res.data.user);

                login(res.data.token, res.data.user)

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                navigate("/dashboard", { state: { user: res.data.user } });
            } else {
                setMessage("Login failed. Please check your credentials.");
            }
        } catch (e) {
            setMessage("Something went wrong!");
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