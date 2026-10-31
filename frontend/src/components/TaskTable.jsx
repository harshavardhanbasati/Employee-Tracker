import Select from "./Select";

export default function TaskTable({ tasks, onStatusChange }) {
  return (
    <div id="tasks" className="overflow-hidden rounded-lg bg-white shadow">
      <div className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-xl font-semibold">Tasks</h2>
          <p className="mt-1 text-sm text-gray-500">
            View assigned work and update its status.
          </p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {tasks.length} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Task</th>
              <th className="px-4 py-3 font-semibold">Employee</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Due date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-800">{task.title}</p>
                  {task.description && (
                    <p className="mt-1 text-sm text-gray-500">
                      {task.description}
                    </p>
                  )}
                </td>
                <td className="px-4 py-4">{task.employee_name}</td>
                <td className="px-4 py-4">
                  <span className={`rounded px-2 py-1 text-xs font-medium ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Low"
                        ? "bg-cyan-100 text-cyan-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-4">{task.due_date || "-"}</td>
                <td className="px-4 py-4">
                  <Select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    className={
                      task.status === "Completed"
                        ? "border-green-300 bg-green-50"
                        : task.status === "In Progress"
                          ? "border-purple-300 bg-purple-50"
                          : "border-yellow-300 bg-yellow-50"
                    }
                    aria-label={`Status for ${task.title}`}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Select>
                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  No tasks created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
