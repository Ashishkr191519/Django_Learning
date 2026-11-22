
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Category colors
const categoryColors = {
  Groceries: "#a855f7",
  Food: "#22d3ee",
  "Food & Dining": "#22d3ee",
  Transport: "#34d399",
  "Bills & Utilities": "#fb923c",
  Shopping: "#ec4899",
  Others: "#64748b",
};

const fallbackColors = [
  "#a855f7",
  "#22d3ee",
  "#34d399",
  "#fb923c",
  "#ec4899",
  "#64748b",
];

const CategoryChart = ({ transactions = [] }) => {
  const categories = useMemo(() => {
    const categoryTotals = {};

    // Only expense transactions
    transactions
      .filter((t) => t.transaction_type === "expense")
      .forEach((transaction) => {
        const category = transaction.category || "Others";
        const amount = Number(transaction.amount);

        if (!Number.isFinite(amount)) return;

        if (!categoryTotals[category]) {
          categoryTotals[category] = 0;
        }

        categoryTotals[category] += amount;
      });

    // Convert grouped data into Recharts format
    return Object.entries(categoryTotals).map(
      ([name, value], index) => ({
        name,
        value,
        color:
          categoryColors[name] ||
          fallbackColors[index % fallbackColors.length],
      })
    );
  }, [transactions]);

  const total = categories.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="min-w-0 rounded-3xl border border-white/10 bg-[#141a30]/90 p-6 shadow-xl">
      <h2 className="text-lg font-semibold text-white">
        Expense by Category
      </h2>

      <p className="mt-1 text-xs text-slate-400">
        Your spending distribution
      </p>

      {total > 0 ? (
        <>
          <div className="relative mx-auto mt-5 h-56 w-full max-w-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke="none"
                >
                  {categories.map((item) => (
                    <Cell
                      key={item.name}
                      fill={item.color}
                    />
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
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">
                ₹{total.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-slate-400">
                Total Spent
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {categories.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                  {item.name}
                </div>

                <span className="font-medium text-white">
                  {((item.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex h-72 flex-col items-center justify-center text-slate-400">
          <p className="text-3xl">◇</p>
          <p className="mt-3 text-sm">
            No expense data available
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
