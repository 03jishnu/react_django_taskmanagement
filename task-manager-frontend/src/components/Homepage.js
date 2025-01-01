import React from 'react';
import { Link } from 'react-router-dom';
import './css/Homepage.css'; 

const HomePage = () => {
    return (
        <div className="homepage-container">
            <h1 className="homepage-title">Welcome to Task Manager</h1>
            <p className="homepage-subtitle">Organize your tasks efficiently and stay productive!</p>

            <div className="button-container">
                <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                <Link to="/login" className="btn btn-secondary">Log In</Link>
            </div>
        </div>
    );
};

export default HomePage;
