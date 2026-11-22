import React from "react";

const goals = [
  {
    name: "New Laptop",
    icon: "💻",
    saved: 43200,
    target: 60000,
    color: "from-violet-500 to-fuchsia-400",
    iconBg: "bg-violet-500/20",
  },
  {
    name: "Travel Trip",
    icon: "✈️",
    saved: 18000,
    target: 40000,
    color: "from-cyan-500 to-teal-400",
    iconBg: "bg-cyan-500/20",
  },
];

const formatMoney = (amount) => `₹${amount.toLocaleString("en-IN")}`;

const SavingsGoals = () => {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#141a30]/90 p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Savings Goals</h2>
        <span className="text-xs text-violet-400">Your progress</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {goals.map((goal) => {
          const percentage = Math.min((goal.saved / goal.target) * 100, 100);

          return (
            <div
              key={goal.name}
              className="rounded-2xl border border-white/10 bg-[#10162a] p-5 transition hover:border-violet-500/40"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${goal.iconBg}`}
              >
                {goal.icon}
              </div>

              <h3 className="font-semibold">{goal.name}</h3>

              <p className="mt-3 text-2xl font-bold">
                {formatMoney(goal.target)}
              </p>

              <div className="mt-5 flex justify-between text-xs">
                <span className="text-slate-400">Progress</span>
                <span className="font-semibold">{percentage.toFixed(0)}%</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {formatMoney(goal.saved)} / {formatMoney(goal.target)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SavingsGoals;
