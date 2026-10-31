import Button from "./Button";
import Input from "./Input";

export default function EmployeeForm({ form, setForm, onSubmit }) {
  return (
    <div id="add-employee" className="rounded-lg border-t-4 border-green-500 bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-green-800">Add Employee</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm font-medium">
          Full name
          <Input
            className="mt-1"
            placeholder="Enter employee name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Email address
          <Input
            className="mt-1"
            type="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Department
          <Input
            className="mt-1"
            placeholder="Enter department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
        </label>
        <Button type="submit" className="w-full">
          Add Employee
        </Button>
      </form>
    </div>
  );
}
