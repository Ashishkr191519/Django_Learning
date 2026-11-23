import React, { useMemo } from "react";
import { Link } from "react-router";

// Category ke according icons
const categoryIcons = {
  Food: "🍕",
  Groceries: "🛒",
  Shopping: "🛍️",
  Transport: "🚗",
  Entertainment: "🎬",
  "Bills & Utilities": "⚡",
  Salary: "💼",
  Freelance: "💻",
  Others: "💳",
};

// Currency formatter
const formatCurrency = (amount) => {
  return Number(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Date formatter
const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(`${date.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const RecentTransactions = ({ transactions = [] }) => {
  // Latest 5 transactions
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => {
        const dateComparison = b.date.localeCompare(a.date);

        if (dateComparison !== 0) {
          return dateComparison;
        }

        return b.id - a.id;
      })
      .slice(0, 5);
  }, [transactions]);

  return (
    <section className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#141a30]/90 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Transactions
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Your latest income and expenses
          </p>
        </div>

        <Link
          to="/dashboard/transactions"
          className="shrink-0 text-xs font-semibold text-violet-400 transition hover:text-violet-300"
        >
          View All →
        </Link>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          {/* Table Header */}
          <thead className="bg-white/5 text-xs text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Transaction</th>

              <th className="px-5 py-3 font-medium">Category</th>

              <th className="px-5 py-3 font-medium">Date</th>

              <th className="px-5 py-3 font-medium">Type</th>

              <th className="px-5 py-3 text-right font-medium">Amount</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-white/5">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => {
                const isIncome = transaction.transaction_type === "income";

                // Django ForeignKey category name
                const categoryName = transaction.category_name || "Others";

                // Select icon using category name
                const icon =
                  categoryIcons[categoryName] || (isIncome ? "💰" : "💳");

                return (
                  <tr
                    key={transaction.id}
                    className="transition hover:bg-white/5"
                  >
                    {/* Transaction Title */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg">
                          {icon}
                        </span>

                        <span className="font-medium text-white">
                          {transaction.title}
                        </span>
                      </div>
                    </td>

                    {/* Category Name */}
                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                      {categoryName}
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                      {formatDate(transaction.date)}
                    </td>

                    {/* Transaction Type */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isIncome
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-pink-500/15 text-pink-400"
                        }`}
                      >
                        {isIncome ? "Income" : "Expense"}
                      </span>
                    </td>

                    {/* Amount */}
                    <td
                      className={`whitespace-nowrap px-5 py-4 text-right font-semibold ${
                        isIncome ? "text-emerald-400" : "text-pink-400"
                      }`}
                    >
                      {isIncome ? "+" : "-"}₹
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                );
              })
            ) : (
              /* Empty State */
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-slate-400"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentTransactions;
