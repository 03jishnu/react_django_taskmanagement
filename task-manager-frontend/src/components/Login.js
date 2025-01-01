import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/Login.css'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/login/",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const { access } = response.data;
            localStorage.setItem("access_token", access); 
            setToken(access);
            setMessage("Login successful!");

           
            navigate("/new-task");
        } catch (error) {
            setMessage(error.response?.data?.error || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">LOGIN</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
