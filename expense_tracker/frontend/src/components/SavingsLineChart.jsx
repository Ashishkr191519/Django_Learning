import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SavingsLineChart = ({ transactions }) => {
  const monthlyData = {};

  // Group transactions by month
  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7);

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expenses: 0,
      };
    }

    if (transaction.transaction_type === "income") {
      monthlyData[month].income += Number(transaction.amount);
    } else if (transaction.transaction_type === "expense") {
      monthlyData[month].expenses += Number(transaction.amount);
    }
  });

  // Calculate savings for each month
  const chartData = Object.values(monthlyData)
    .map((item) => ({
      month: item.month,
      savings: item.income - item.expenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1225] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Monthly Savings Trend
      </h2>

      {chartData.length === 0 ? (
        <p className="py-12 text-center text-slate-400">
          No savings data available.
        </p>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

              <XAxis dataKey="month" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />

              <Line
                type="monotone"
                dataKey="savings"
                name="Savings"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SavingsLineChart;
