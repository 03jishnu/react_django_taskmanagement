import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/Signup.css'; 

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/signup/", formData);
            setMessage("Signup successful!");  
            console.log("User created successfully:", response.data);

            
            navigate("/login");  
            
        } catch (error) {
            setMessage("Error during signup.");
            console.error("Error during signup:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
            {message && <p className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}
        </div>
    );
};

export default Signup;
