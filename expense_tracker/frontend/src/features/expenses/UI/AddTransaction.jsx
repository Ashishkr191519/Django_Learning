
import { useState } from "react";
import { useNavigate } from "react-router";
import useTransactions from "../hooks/useTransactions";


const AddTransaction = () => {
  const navigate = useNavigate();
  const { createTransaction } = useTransactions();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    transaction_type: "expense",
    category: "",
    date: new Date().toLocaleDateString("en-CA"),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await createTransaction(formData);

    setLoading(false);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("Failed to add transaction. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-white outline-none transition focus:border-violet-500";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Transaction</h1>
        <p className="mt-2 text-sm text-slate-400">
          Record your income or expense.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-white/10 bg-[#0c1225] p-6 shadow-xl"
      >
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Transaction Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Grocery shopping"
            required
            maxLength={100}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Transaction Type
          </label>
          <select
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Food, Salary, Transport"
            maxLength={50}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-slate-300 hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
