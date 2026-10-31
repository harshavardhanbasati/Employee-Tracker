from datetime import date
from typing import Optional
from pydantic import BaseModel


class EmployeeBase(BaseModel):
    name: str
    email: str
    department: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str
    due_date: Optional[date] = None
    employee_id: int


class TaskStatusUpdate(BaseModel):
    status: str


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    priority: str
    due_date: Optional[date] = None
    status: str
    employee_id: int
    employee_name: str
