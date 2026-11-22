import { useState } from "react";

import CategoryPieChart from "../../../components/CategoryPieChart";
import MonthlyBarChart from "../../../components/MonthlyBarChart";
import SavingsLineChart from "../../../components/SavingsLineChart";

import useTransactions from "../hooks/useTransactions";

const Analytics = () => {
  // Get transactions from Redux through custom hook
  const { transactions } = useTransactions();

  // Date filter state
  const [dateFilter, setDateFilter] = useState("all");

  // Filter transactions according to selected date range
  const filteredTransactions = transactions.filter((transaction) => {
    if (dateFilter === "all") {
      return true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const transactionDate = new Date(`${transaction.date}T00:00:00`);

    // This Month
    if (dateFilter === "month") {
      return (
        transactionDate.getFullYear() === today.getFullYear() &&
        transactionDate.getMonth() === today.getMonth() &&
        transactionDate <= today
      );
    }

    // Last 7 Days or Last 30 Days
    if (dateFilter === "7days" || dateFilter === "30days") {
      const days = dateFilter === "7days" ? 7 : 30;

      const startDate = new Date(today);
      startDate.setDate(today.getDate() - (days - 1));

      return transactionDate >= startDate && transactionDate <= today;
    }

    return true;
  });

  // Calculate income from FILTERED transactions
  const totalIncome = filteredTransactions
    .filter((transaction) => transaction.transaction_type === "income")
    .reduce((sum, transaction) => {
      return sum + Number(transaction.amount);
    }, 0);

  // Calculate expenses from FILTERED transactions
  const totalExpenses = filteredTransactions
    .filter((transaction) => transaction.transaction_type === "expense")
    .reduce((sum, transaction) => {
      return sum + Number(transaction.amount);
    }, 0);

  // Calculate net savings
  const netSavings = totalIncome - totalExpenses;

  // Summary cards
  const cards = [
    {
      title: "Total Income",
      amount: totalIncome,
      color: "text-emerald-400",
    },
    {
      title: "Total Expenses",
      amount: totalExpenses,
      color: "text-red-400",
    },
    {
      title: "Net Savings",
      amount: netSavings,
      color: "text-violet-400",
    },
  ];

  return (
    <div className="space-y-8 text-white">
      {/* Analytics Heading */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>

        <p className="mt-2 text-slate-400">
          Analyze your income, expenses and savings.
        </p>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Financial Overview</h2>

          <p className="mt-1 text-sm text-slate-400">
            Showing {filteredTransactions.length} transactions
          </p>
        </div>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          aria-label="Filter analytics by date"
          className="rounded-xl border border-white/10 bg-[#0c1225] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-[#0c1225] p-6 shadow-lg transition hover:border-violet-500/30"
          >
            <p className="text-sm text-slate-400">{card.title}</p>

            <h2 className={`mt-3 text-3xl font-bold ${card.color}`}>
              ₹
              {card.amount.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        ))}
      </div>

      {/* Monthly Income vs Expenses */}
      <MonthlyBarChart transactions={filteredTransactions} />

      {/* Category-wise Spending */}
      <CategoryPieChart transactions={filteredTransactions} />

      {/* Monthly Savings Trend */}
      <SavingsLineChart transactions={filteredTransactions} />
    </div>
  );
};

export default Analytics;
