# react_django_taskmanagement
Taskmanager website with Django and React

# Task Management (React & Django)
Task Management is a web application built using React for the frontend and Django for the backend. The application allows users to manage tasks, set deadlines, and track progress. It is designed with a REST API that serves data to the React frontend.

## Architecture and Design Choices
### Frontend
- **React**: Used for building the user interface (UI). We used **React Hooks** and **Functional Components** for a more modern and efficient approach to state management.
- **Axios**: Used for making API calls from the frontend to the Django backend.
- **React Router**: Used for handling navigation within the app.

### Backend
- **Django**: Django serves as the backend and handles the logic for user authentication, task management, and interacting with the database.
- **Django REST Framework**: We used Django REST Framework to create the API endpoints that the React frontend communicates with.
- **MySQL**: We used MySQL for storing user data, tasks, and other related information.

## Folder Structure
The folder structure of the project is divided into two main sections:

- **/frontend**: Contains all the files related to the React frontend application.
  - `/src`: Where the React components, hooks, and utilities are located.
  - `/public`: Contains static files like `index.html` and images.
  
- **/backend**: Contains all the files for the Django backend application.
  - `/task_management`: Main app responsible for task management.
  - `/db`: Where MySQL database settings and migrations are configured.

## Setup and Installation
### Prerequisites
- Python 3.x or higher
- Node.js and npm (for React)

- ### Backend Setup
1. Navigate to the backend folder:
   ```bash
  cd backend
pip install -r requirements.txt
python manage.py runserver
cd frontend
npm install
npm start

## Testing the Application
Once both the backend and frontend servers are running, open the following URLs in your browser:

- **Frontend (React)**: http://localhost:3000
- **Backend (Django API)**: http://localhost:8000

You should be able to interact with the task management system and test its features.

