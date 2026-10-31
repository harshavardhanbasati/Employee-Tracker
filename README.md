# Employee Task Tracker

A full-stack web application for managing employees and tracking their assigned tasks. The frontend is built with **React**, **Vite**, and **Tailwind CSS**. The backend uses **Python**, **FastAPI**, and **SQLAlchemy**, with **PostgreSQL** for persistent storage.

**Repository:** [harshavardhanbasati/Employee-Tracker](https://github.com/harshavardhanbasati/Employee-Tracker)

## Features

### Employee management
- Add employees with a name, email address, and department.
- View the employee list.
- Delete employees.

### Task management
- Create tasks with a title, description, priority, and optional due date.
- Assign each task to an employee.
- View tasks with their assigned employee's name.
- Update task status: **Pending**, **In Progress**, or **Completed**.

### Dashboard
- Total employee count.
- Total task count.
- Completed task count.
- Pending task count.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6 |
| Styling | Tailwind CSS 4 |
| Backend | Python, FastAPI |
| ORM | SQLAlchemy |
| Database | PostgreSQL |
| API documentation | FastAPI Swagger UI / ReDoc |

## Project structure

```text
Employee-Tracker/
├── backend/
│   ├── .env.example
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   └── schemas.py
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       │   ├── Button.jsx
│       │   ├── Card.jsx
│       │   ├── EmployeeForm.jsx
│       │   ├── EmployeeList.jsx
│       │   ├── Input.jsx
│       │   ├── Select.jsx
│       │   ├── TaskForm.jsx
│       │   └── TaskTable.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── index.css
│       └── main.jsx
│
└── README.md
```

## Prerequisites

Install the following before starting:

- Python 3.10 or later
- Node.js and npm
- PostgreSQL
- Git

## Installation and setup

### 1. Clone the repository

```bash
git clone https://github.com/harshavardhanbasati/Employee-Tracker.git
cd Employee-Tracker
```

### 2. Create the PostgreSQL database

Create a database named `employee_tracker` in PostgreSQL. For example, using `psql`:

```sql
CREATE DATABASE employee_tracker;
```

### 3. Configure and run the backend

From the project root, open a terminal and run:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment.

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

**macOS / Linux:**

```bash
source .venv/bin/activate
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Create a local `.env` file by copying the example file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Edit `backend/.env` and set your PostgreSQL credentials and the frontend origins allowed to call the API:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/employee_tracker
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Replace `YOUR_PASSWORD` with your local PostgreSQL password. Keep your `.env` file private and do not commit it.

Start the FastAPI development server:

```bash
uvicorn main:app --reload
```

The backend will be available at:

- API root: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

### 4. Configure and run the frontend

Open a **second terminal** from the project root:

```bash
cd frontend
npm install
```

Create a file named `frontend/.env` with the backend API URL:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

> Keep both the backend and frontend servers running while using the application.

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API welcome message |
| `GET` | `/employees` | Retrieve all employees |
| `POST` | `/employees` | Create an employee |
| `DELETE` | `/employees/{employee_id}` | Delete an employee |
| `GET` | `/tasks` | Retrieve tasks with assigned employee names |
| `POST` | `/tasks` | Create and assign a task |
| `PUT` | `/tasks/{task_id}/status` | Update a task's status |
| `GET` | `/dashboard` | Retrieve employee and task summary counts |

Interactive API documentation is available at `http://127.0.0.1:8000/docs` after starting the backend.

## Database relationship

The application uses two main entities:

- **Employee** stores the employee's name, email, and department.
- **Task** stores the task title, description, priority, due date, status, and assigned employee ID.

One employee can have multiple tasks. Each task references its assigned employee through a foreign key.

## Environment variable notes

- `DATABASE_URL` and `CORS_ORIGINS` belong in `backend/.env`.
- `VITE_API_URL` belongs in `frontend/.env` and points to the FastAPI server.
- Variables prefixed with `VITE_` are exposed to frontend browser code. Do not put database credentials, passwords, or other secrets in `frontend/.env`.
- The committed `.env.example` is a template. Use local `.env` files for your machine-specific values.

## Author

**Harshavardhan Basati**  
GitHub: [@harshavardhanbasati](https://github.com/harshavardhanbasati)
