import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const colors = [
  "#a855f7",
  "#22d3ee",
  "#34d399",
  "#fb923c",
  "#ec4899",
  "#64748b",
];

const CategoryPieChart = ({ transactions = [] }) => {
  const chartData = useMemo(() => {
    const totals = new Map();

    transactions
      .filter((t) => t.transaction_type === "expense")
      .forEach((transaction) => {
        const categoryName = transaction.category_name || "Others";

        const amount = Number(transaction.amount);

        if (!Number.isFinite(amount) || amount <= 0) return;

        totals.set(categoryName, (totals.get(categoryName) || 0) + amount);
      });

    return Array.from(totals.entries()).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  }, [transactions]);

  const total = chartData.reduce((sum, category) => sum + category.value, 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1225] p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-white">
        Category-wise Spending
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Expense distribution across your categories
      </p>

      {chartData.length > 0 ? (
        <>
          <div className="mt-6 h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  stroke="none"
                >
                  {chartData.map((category) => (
                    <Cell key={category.name} fill={category.color} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                  contentStyle={{
                    backgroundColor: "#151b30",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 border-t border-white/10 pt-4 text-center">
            <p className="text-sm text-slate-400">Total Expenses</p>
            <p className="mt-1 text-2xl font-bold text-white">
              ₹
              {total.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </>
      ) : (
        <div className="flex h-72 items-center justify-center text-sm text-slate-400">
          No expense data available
        </div>
      )}
    </div>
  );
};

export default CategoryPieChart;
