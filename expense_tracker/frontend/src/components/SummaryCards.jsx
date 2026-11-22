import React from "react";

const accentStyles = {
  cyan: "bg-cyan-500/15 text-cyan-300",
  pink: "bg-pink-500/15 text-pink-300",
  blue: "bg-blue-500/15 text-blue-300",
  purple: "bg-violet-500/15 text-violet-300",
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};

const SummaryCards = ({
  totalIncome = 0,
  totalExpenses = 0,
  totalBalance = 0,
  totalTransactions = 0,
}) => {
  // Dynamic cards based on backend transactions
  const cards = [
    {
      title: "Total Income",
      amount: formatCurrency(totalIncome),
      icon: "↗",
      accent: "cyan",
    },
    {
      title: "Total Expenses",
      amount: formatCurrency(totalExpenses),
      icon: "↘",
      accent: "pink",
    },
    {
      title: "Total Transactions",
      amount: totalTransactions.toLocaleString("en-IN"),
      icon: "⇄",
      accent: "blue",
    },
    {
      title: "Net Savings",
      amount: formatCurrency(totalBalance),
      icon: "◇",
      accent: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Featured Balance Card */}
      <div className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-[#21133f] via-[#151532] to-[#082f3c] p-8 shadow-[0_0_35px_#7c3aed22]">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm font-medium text-slate-300">Total Balance</p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {formatCurrency(totalBalance)}
          </h2>

          <div className="mt-5">
            <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm font-medium text-violet-200">
              Income − Expenses
            </span>
          </div>
        </div>
      </div>

      {/* Four KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-white/10 bg-gradient-to-br from-[#171d37] to-[#101629] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_25px_#7c3aed22]"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${accentStyles[card.accent]}`}
              >
                {card.icon}
              </div>

              <p className="text-sm text-slate-300">{card.title}</p>
            </div>

            <div className="mt-5 flex items-end justify-between gap-2">
              <h3 className="break-words text-2xl font-bold tracking-tight">
                {card.amount}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
