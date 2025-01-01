import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import './css/TaskForm.css';  
import { Link } from "react-router-dom";

const TaskForm = ({ onTaskCreated }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        status: "Pending",
    });
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("access_token");

    const navigate = useNavigate(); 

    if (!token) {
        return <p>Please log in to create tasks.</p>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/tasks/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                if (typeof onTaskCreated === "function") {
                    onTaskCreated(response.data);
                }
                setMessage("Task created successfully!");
                setFormData({
                    title: "",
                    description: "",
                    due_date: "",
                    status: "Pending",
                });
                navigate("/task-list");
            } else {
                setMessage("Unexpected error occurred while creating task.");
            }
        } catch (error) {
            console.error("Error creating task:", error);

            if (error.response) {
                
                console.error("Response error:", error.response);
                
                const responseError = error.response.data;
                const status = error.response.status;
                const message = responseError?.detail || responseError?.message || "An unknown error occurred.";
                setMessage(`Error: ${message} (Status: ${status})`);
            } else if (error.request) {
               
                console.error("Request error:", error.request);
                setMessage("No response from server. Please check your network.");
            } else {
                
                console.error("Error message:", error.message);
                setMessage("Error creating task.");
            }
        }
    };

    const validateForm = () => {
        const { title, due_date } = formData;
        const currentDate = new Date().toISOString().split("T")[0]; 

        if (!title || !due_date) {
            setMessage("Title and Due Date are required.");
            return false;
        }

        if (due_date < currentDate) {
            setMessage("Due date cannot be in the past.");
            return false;
        }

        return true;
    };

    return (
        <div className="task-form-container">
            <h2>Create a New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        name="due_date"
                        type="date"
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">Create Task</button>
                {message && <p className="message">{message}</p>}
            </form>

            {/* <div className="navigation-links">
                <Link to="/task-list" className="btn btn-primary">
                    View Task List
                </Link>
            </div> */}
        </div>
    );
};

export default TaskForm;
