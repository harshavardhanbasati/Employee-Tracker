import { useEffect, useState } from "react";
import { api } from "./api";
import Card from "./components/Card";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";

const emptyEmployee = { name: "", email: "", department: "" };
const emptyTask = {
  title: "",
  description: "",
  priority: "Medium",
  due_date: "",
  employee_id: "",
};

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [dashboard, setDashboard] = useState({
    total_employees: 0,
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
  });
  const [employeeForm, setEmployeeForm] = useState(emptyEmployee);
  const [taskForm, setTaskForm] = useState(emptyTask);

  const loadData = async () => {
    try {
      const [employeeData, taskData, dashboardData] = await Promise.all([
        api("/employees"),
        api("/tasks"),
        api("/dashboard"),
      ]);

      setEmployees(employeeData);
      setTasks(taskData);
      setDashboard(dashboardData);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addEmployee = async (event) => {
    event.preventDefault();

    try {
      await api("/employees", {
        method: "POST",
        body: JSON.stringify(employeeForm),
      });

      setEmployeeForm(emptyEmployee);
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee and their tasks?")) return;

    try {
      await api(`/employees/${id}`, { method: "DELETE" });
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const addTask = async (event) => {
    event.preventDefault();

    try {
      await api("/tasks", {
        method: "POST",
        body: JSON.stringify({
          ...taskForm,
          due_date: taskForm.due_date || null,
          employee_id: Number(taskForm.employee_id),
        }),
      });

      setTaskForm(emptyTask);
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api(`/tasks/${taskId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });

      loadData();
    } catch (error) {
      alert(error.message);
    }
  };

  const cards = [
    ["Total Employees", dashboard.total_employees, "purple"],
    ["Total Tasks", dashboard.total_tasks, "blue"],
    ["Completed Tasks", dashboard.completed_tasks, "green"],
    ["Pending Tasks", dashboard.pending_tasks, "orange"],
  ];

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 text-gray-800">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-600 px-6 py-7 text-white shadow">
          <h1 className="text-3xl font-bold">Employee Task Tracker</h1>
          <p className="mt-2 text-blue-100">
            Add employees, assign tasks, and keep track of their progress.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Dashboard</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(([title, value, color]) => (
              <Card key={title} title={title} value={value} color={color} />
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <EmployeeForm
            form={employeeForm}
            setForm={setEmployeeForm}
            onSubmit={addEmployee}
          />
          <TaskForm
            employees={employees}
            form={taskForm}
            setForm={setTaskForm}
            onSubmit={addTask}
          />
        </section>

        <section className="mb-8">
          <EmployeeList employees={employees} onDelete={deleteEmployee} />
        </section>

        <TaskTable tasks={tasks} onStatusChange={updateStatus} />
      </div>
    </main>
  );
}
