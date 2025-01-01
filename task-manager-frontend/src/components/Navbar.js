import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Navbar.css'; 

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
            try {
                await axios.post('http://127.0.0.1:8000/api/logout/', { refresh_token: refreshToken });
                console.log('Logged out from the server');
            } catch (error) {
                console.error('Error logging out from the server:', error);
            }
        }

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
               
                <div className="navbar-heading">
                    <Link to="/" className="navbar-heading-link">TaskManagement</Link>
                </div>

               
                <ul className="navbar-list">
                    <li>
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/task-list" className="navbar-link">Task List</Link>
                    </li>
                    <li>
                        <Link to="/new-task" className="navbar-link">Create Task</Link>
                    </li>
                </ul>

                {/* Logout button on the right */}
                <div className="navbar-logout">
                    <Link
                        to="#"
                        className="navbar-link logout-link"
                        onClick={(e) => {
                            e.preventDefault(); 
                            handleLogout();
                        }}
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
