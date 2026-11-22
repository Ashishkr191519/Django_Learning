import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CashFlowChart = ({ transactions = [] }) => {
  const currentYear = new Date().getFullYear();

  const chartData = useMemo(() => {
    // Step 1: Initialize all 12 months
    const monthlyData = months.map((month) => ({
      month,
      income: 0,
      expense: 0,
    }));

    // Step 2: Process backend transactions
    transactions.forEach((transaction) => {
      const [year, month] = transaction.date.split("-").map(Number);

      // Only include transactions from current year
      if (year !== currentYear || month < 1 || month > 12) {
        return;
      }

      const amount = Number(transaction.amount);

      if (!Number.isFinite(amount)) return;

      const monthIndex = month - 1;

      if (transaction.transaction_type === "income") {
        monthlyData[monthIndex].income += amount;
      } else if (transaction.transaction_type === "expense") {
        monthlyData[monthIndex].expense += amount;
      }
    });

    return monthlyData;
  }, [transactions, currentYear]);

  return (
    <div className="min-w-0 rounded-3xl border border-white/10 bg-[#141a30]/90 p-6 shadow-xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Cash Flow Overview
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Income vs Expenses — {currentYear}
          </p>
        </div>

        <div className="flex gap-4 text-xs">
          <span className="text-cyan-400">● Income</span>
          <span className="text-violet-400">● Expenses</span>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#29314a"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />

            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}k` : value
              }
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#151b30",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
            />

            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#22d3ee"
              strokeWidth={3}
              fill="url(#incomeGradient)"
            />

            <Area
              type="monotone"
              dataKey="expense"
              name="Expenses"
              stroke="#a855f7"
              strokeWidth={3}
              fill="url(#expenseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlowChart;
