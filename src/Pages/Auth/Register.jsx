// import React, { useState } from "react";
// import "./Register.css";

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: ''
//     });
//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Store the form data in local storage
//         localStorage.setItem('userData', JSON.stringify(formData));

//         // Optionally, you can set a success message
//         setMessage('Registration successful!');

//         // Clear the form
//         setFormData({
//             username: '',
//             password: ''
//         });
//     };

//     return (
//         <div className="register-container">
//             <h2>Register</h2>
//             {message && <p className="success-message">{message}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="input-group">
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         name="username"
//                         placeholder="Enter your username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="input-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button className="btn" type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;
import React, { useState } from "react";
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.termsAccepted) {
            setMessage("You must accept the Terms and Conditions.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        // Store form data in local storage
        localStorage.setItem("userData", JSON.stringify(formData));

        setMessage("Registration successful!");

        // Clear form fields
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsAccepted: false
        });
    };

    return (
        <div className="ring">
            <i style={{ "--clr": "#00ff0a" }}></i>
            <i style={{ "--clr": "#ff0057" }}></i>
            <i style={{ "--clr": "#fffd44" }}></i>
            <div className="register">
                <h2>Register</h2>
                {message && <p className="success-message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                        />
                        <label>I accept the Terms and Conditions</label>
                    </div>
                    <br />
                    <button className="btn" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;