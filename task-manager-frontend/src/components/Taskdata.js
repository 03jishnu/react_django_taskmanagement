import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/TaskList.css'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [message, setMessage] = useState("");
    const [editingTask, setEditingTask] = useState(null);  
    const [updatedData, setUpdatedData] = useState({
        title: "",
        description: "",
        due_date: "",  
        status: "Pending",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("access_token");

    // Fetch tasks function
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            setTasks(response.data.filter((task) => (statusFilter ? task.status === statusFilter : true)));
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setMessage("Failed to load tasks.");
        }
    };

    useEffect(() => {
        if (!token) {
            setMessage("Please log in to view tasks.");
            return;
        }

        fetchTasks();
    }, [statusFilter, token]); // Fetch tasks whenever token or statusFilter changes

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            fetchTasks(); 
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setUpdatedData({
            title: task.title,
            description: task.description,
            due_date: task.due_date,  
            status: task.status,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 
        setSuccessMessage(""); 
        try {
            await axios.put(
                `http://127.0.0.1:8000/api/tasks/${editingTask.id}/`,
                updatedData,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            setEditingTask(null);  
            fetchTasks();  
            setSuccessMessage("Task updated successfully!"); 
        } catch (error) {
            console.error("Error updating task:", error);
            setErrorMessage("Failed to update task. Please try again.");  
        }
    };

    return (
        <div className="task-list-container">
            {message && <p className="error-message">{message}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="filter-container">
                <label>Filter by Status: </label>
                <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter} className="status-filter">
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="task-cards">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-card">
                            <div className="task-card-header">
                                <h3>{task.title}</h3>
                                <p>Due Date: {task.due_date}</p>  
                            </div>
                            <p>{task.description}</p>
                            <div className="task-card-footer">
                                <button onClick={() => handleDelete(task.id)} className="delete-btn">Delete</button>
                                <button onClick={() => handleEdit(task)} className="edit-btn">Edit</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
            </div>

            {editingTask && (
                <div className="edit-task-form">
                    <h2>Edit Task</h2>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <input
                                type="text"
                                value={updatedData.title}
                                onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                value={updatedData.description}
                                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                value={updatedData.due_date} 
                                onChange={(e) => setUpdatedData({ ...updatedData, due_date: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <select
                                value={updatedData.status}
                                onChange={(e) => setUpdatedData({ ...updatedData, status: e.target.value })}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <button type="submit">Update Task</button>
                        <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TaskList;
