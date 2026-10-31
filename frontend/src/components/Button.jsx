export default function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-green-600 text-white hover:bg-green-700",
    danger: "border border-red-300 bg-white text-red-600 hover:bg-red-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded px-4 py-2 font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
