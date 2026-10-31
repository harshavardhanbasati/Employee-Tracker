const colors = {
  purple: "border-purple-400 bg-purple-50 text-purple-700",
  blue: "border-blue-400 bg-blue-50 text-blue-700",
  green: "border-green-400 bg-green-50 text-green-700",
  orange: "border-orange-400 bg-orange-50 text-orange-700",
};

export default function Card({ title, value, color = "blue" }) {
  return (
    <div className={`rounded-lg border-l-4 p-5 shadow ${colors[color] || colors.blue}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
