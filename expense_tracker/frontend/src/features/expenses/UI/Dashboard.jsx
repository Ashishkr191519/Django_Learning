import React from "react";
import SummaryCards from "../../../components/SummaryCards";
import CashFlowChart from "../../../components/CashFlowChart";
import CategoryChart from "../../../components/CategoryChart";
import SavingsGoals from "../../../components/SavingsGoals";
import RecentTransactions from "../../../components/RecentTransactions";
import useTransactions from "../hooks/useTransactions";

const Dashboard = () => {
  const { transactions } = useTransactions();
  console.log("Redux Transactions:", transactions);

  const totalIncome = transactions
    .filter((transaction) => transaction.transaction_type === "income")
    .reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.transaction_type === "expense")
    .reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);

  const totalBalance = totalIncome - totalExpenses;

  const totalTransactions = transactions.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
        <p className="mt-2 text-sm text-slate-400">
          Here's what's happening with your finances.
        </p>
      </div>

      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalBalance={totalBalance}
        totalTransactions={totalTransactions}
      />
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="min-w-0 xl:col-span-3">
          <CashFlowChart transactions={transactions}/>
        </div>

        <div className="min-w-0 xl:col-span-2">
          <CategoryChart transactions={transactions} />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="min-w-0 xl:col-span-2">
          <SavingsGoals />
        </div>

        <div className="min-w-0 xl:col-span-3">
          <RecentTransactions transactions={transactions} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
