export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${className}`}
    />
  );
}
