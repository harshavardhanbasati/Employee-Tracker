import os

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Employee, Task
from schemas import EmployeeCreate, EmployeeResponse, TaskCreate, TaskResponse, TaskStatusUpdate

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Task Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
        if origin.strip()
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def task_response(task: Task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "priority": task.priority,
        "due_date": task.due_date,
        "status": task.status,
        "employee_id": task.employee_id,
        "employee_name": task.employee.name,
    }


@app.get("/")
def root():
    return {"message": "Employee Task Tracker API"}


@app.get("/employees", response_model=list[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).order_by(Employee.id.desc()).all()


@app.post("/employees", response_model=EmployeeResponse, status_code=201)
def create_employee(data: EmployeeCreate, db: Session = Depends(get_db)):
    if db.query(Employee).filter(Employee.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    employee = Employee(**data.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.get(Employee, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(employee)
    db.commit()
    return {"message": "Employee deleted successfully"}


@app.get("/tasks", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).order_by(Task.id.desc()).all()
    return [task_response(task) for task in tasks]


@app.post("/tasks", response_model=TaskResponse, status_code=201)
def create_task(data: TaskCreate, db: Session = Depends(get_db)):
    employee = db.get(Employee, data.employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Assigned employee not found")

    task = Task(**data.model_dump())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task_response(task)


@app.put("/tasks/{task_id}/status", response_model=TaskResponse)
def update_task_status(task_id: int, data: TaskStatusUpdate, db: Session = Depends(get_db)):
    allowed = {"Pending", "In Progress", "Completed"}
    if data.status not in allowed:
        raise HTTPException(status_code=400, detail="Invalid task status")

    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.status = data.status
    db.commit()
    db.refresh(task)
    return task_response(task)


@app.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):
    return {
        "total_employees": db.query(Employee).count(),
        "total_tasks": db.query(Task).count(),
        "completed_tasks": db.query(Task).filter(Task.status == "Completed").count(),
        "pending_tasks": db.query(Task).filter(Task.status == "Pending").count(),
    }
