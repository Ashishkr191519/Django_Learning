
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyBarChart = ({ transactions }) => {
  const monthlyData = {};

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

  const chartData = Object.values(monthlyData).sort((a, b) =>
    a.month.localeCompare(b.month)
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1225] p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Monthly Income vs Expenses
      </h2>

      {chartData.length === 0 ? (
        <p className="py-12 text-center text-slate-400">
          No transaction data available.
        </p>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />
              <Legend />
              <Bar
                dataKey="income"
                fill="#34d399"
                name="Income"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                fill="#f87171"
                name="Expenses"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MonthlyBarChart;
