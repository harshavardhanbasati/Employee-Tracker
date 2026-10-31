import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

export default function TaskForm({ employees, form, setForm, onSubmit }) {
  return (
    <div id="add-task" className="rounded-lg border-t-4 border-orange-500 bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-orange-800">Create Task</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm font-medium">
          Task title
          <Input
            className="mt-1"
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </label>

        <label className="block text-sm font-medium">
          Description
          <textarea
            placeholder="Enter a short description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 min-h-20 w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Priority
            <Select
              className="mt-1"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Select>
          </label>

          <label className="block text-sm font-medium">
            Due date
            <Input
              className="mt-1"
              type="date"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          Assign to employee
          <Select
            className="mt-1"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
            required
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </Select>
        </label>

        <Button type="submit" variant="secondary" className="w-full">
          Create Task
        </Button>
      </form>
    </div>
  );
}
