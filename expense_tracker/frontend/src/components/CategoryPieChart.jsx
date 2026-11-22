
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#f59e0b",
  "#10b981",
  "#f43f5e",
  "#6366f1",
];

const CategoryPieChart = ({ transactions }) => {
  const categoryData = {};

  // Sirf expense transactions lenge
  transactions
    .filter((transaction) => transaction.transaction_type === "expense")
    .forEach((transaction) => {
      const category = transaction.category;

      if (!categoryData[category]) {
        categoryData[category] = 0;
      }

      categoryData[category] += Number(transaction.amount);
    });

  // Object ko chart-compatible array mein convert karna
  const chartData = Object.entries(categoryData)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1225] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Category-wise Spending
      </h2>

      {chartData.length === 0 ? (
        <p className="py-12 text-center text-slate-400">
          No expense data available.
        </p>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={105}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
