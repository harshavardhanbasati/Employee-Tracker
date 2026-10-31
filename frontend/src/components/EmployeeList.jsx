import Button from "./Button";

export default function EmployeeList({ employees, onDelete }) {
  return (
    <div id="team" className="rounded-lg bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Employees</h2>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {employees.length} total
        </span>
      </div>

      {employees.length === 0 ? (
        <p className="rounded border border-dashed border-gray-300 p-6 text-center text-gray-500">
          No employees added yet.
        </p>
      ) : (
        <div className="divide-y divide-gray-200">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-gray-800">
                  <span className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                    {employee.name.charAt(0).toUpperCase()}
                  </span>
                  {employee.name}
                </p>
                <p className="text-sm text-gray-500">
                  {employee.email} · {employee.department}
                </p>
              </div>
              <Button
                variant="danger"
                onClick={() => onDelete(employee.id)}
                aria-label={`Delete ${employee.name}`}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
