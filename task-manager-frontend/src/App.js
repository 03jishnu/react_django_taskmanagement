import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./components/Taskdata";
import TaskForm from "./components/Taskform";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import Navbar from "./components/Navbar";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("access_token"));

   
    useEffect(() => {
        if (token) {
            localStorage.setItem("access_token", token);
        } else {
            localStorage.removeItem("access_token");
        }
    }, [token]);

    return (
        <Router>
            <Navbar setToken={setToken} /> 
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup setToken={setToken} />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/task-list" element={token ? <TaskList /> : <Navigate to="/login" />} />
                <Route path="/new-task" element={token ? <TaskForm /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
