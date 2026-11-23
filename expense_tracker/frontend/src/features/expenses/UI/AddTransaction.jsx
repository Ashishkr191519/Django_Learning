import { useState } from "react";
import { useNavigate } from "react-router";

import useTransactions from "../hooks/useTransactions";
import useCategories from "../../categories/hooks/useCategories";

const AddTransaction = () => {
  const navigate = useNavigate();

  const { createTransaction } = useTransactions();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    transaction_type: "expense",
    category: "",
    date: new Date().toLocaleDateString("en-CA"),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Only categories matching transaction type
  const filteredCategories = categories.filter(
    (category) => category.category_type === formData.transaction_type,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,

      // Reset category when switching income/expense
      ...(name === "transaction_type" ? { category: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    setLoading(true);

    try {
      const success = await createTransaction({
        ...formData,
        category: Number(formData.category),
      });

      if (success) {
        navigate("/dashboard");
      } else {
        setError("Failed to add transaction. Please try again.");
      }
    } catch (err) {
      setError("Failed to add transaction. Please try again.");
    } finally {
      setLoading(false);
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
        {/* Title */}
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

        {/* Amount */}
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

        {/* Transaction Type */}
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

        {/* Dynamic Category Dropdown */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={categoriesLoading || Boolean(categoriesError)}
            className={inputClass}
          >
            <option value="">
              {categoriesLoading ? "Loading categories..." : "Select Category"}
            </option>

            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {categoriesError ? (
            <p className="mt-2 text-sm text-red-400">
              Unable to load categories.
            </p>
          ) : (
            !categoriesLoading &&
            filteredCategories.length === 0 && (
              <p className="mt-2 text-sm text-amber-400">
                No {formData.transaction_type} categories found. Create one from
                the Categories page.
              </p>
            )
          )}
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Error */}
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Buttons */}
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
            disabled={
              loading ||
              categoriesLoading ||
              Boolean(categoriesError) ||
              filteredCategories.length === 0
            }
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
