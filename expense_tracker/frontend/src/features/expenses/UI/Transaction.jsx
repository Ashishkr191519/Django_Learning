import { useState } from "react";
import { useNavigate } from "react-router";
import useTransactions from "../hooks/useTransactions";

const Transaction = () => {
  const navigate = useNavigate();

  const { transactions, deleteTransaction, editTransaction } =
    useTransactions();

  // Search and filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Edit modal
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  // Open edit modal with existing data
  const handleEdit = (transaction) => {
    setEditingTransaction({ ...transaction });
    setEditError("");
  };

  // Handle edit form inputs
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update transaction
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingTransaction || saving) return;

    setSaving(true);
    setEditError("");

    const { title, amount, transaction_type, category, date } =
      editingTransaction;

    try {
      const success = await editTransaction(editingTransaction.id, {
        title,
        amount,
        transaction_type,
        category,
        date,
      });

      if (success) {
        setEditingTransaction(null);
      } else {
        setEditError("Failed to update transaction.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setEditError("Something went wrong while updating.");
    } finally {
      setSaving(false);
    }
  };

  // Delete transaction
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) return;

    const success = await deleteTransaction(id);

    if (!success) {
      alert("Failed to delete transaction.");
    }
  };

  // Search and filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFilter =
      filter === "all" || transaction.transaction_type === filter;

    return matchesSearch && matchesFilter;
  });

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#080d1c] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500";

  return (
    <div className="space-y-6 text-white">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>

          <p className="mt-2 text-sm text-slate-400">
            View and manage your income and expenses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/add")}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          + Add Transaction
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} min-w-0 flex-1`}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`${inputClass} sm:w-auto`}
        >
          <option value="all">All Transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0c1225]">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-white/5 transition hover:bg-white/5"
              >
                {/* Title */}
                <td className="px-6 py-4 font-medium">{transaction.title}</td>

                {/* Category */}
                <td className="px-6 py-4 text-slate-400">
                  {transaction.category}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-slate-400">{transaction.date}</td>

                {/* Type */}
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.transaction_type === "income"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {transaction.transaction_type}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`px-6 py-4 text-right font-semibold ${
                    transaction.transaction_type === "income"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.transaction_type === "income" ? "+" : "-"}₹
                  {Number(transaction.amount).toLocaleString("en-IN")}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(transaction)}
                      className="text-violet-400 transition hover:text-violet-300"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-400 transition hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            No transactions found.
          </div>
        )}
      </div>

      {/* Transaction Count */}
      <p className="text-sm text-slate-500">
        Showing {filteredTransactions.length} of {transactions.length}{" "}
        transactions
      </p>

      {/* Edit Transaction Modal */}
      {editingTransaction && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        >
          <form
            onSubmit={handleUpdate}
            aria-label="Edit Transaction"
            className="max-h-[90vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-2xl border border-violet-500/30 bg-[#0c1225] p-6 shadow-2xl"
          >
            {/* Modal Heading */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Edit Transaction</h2>

              <button
                type="button"
                disabled={saving}
                onClick={() => setEditingTransaction(null)}
                className="text-xl text-slate-400 hover:text-white disabled:opacity-50"
                aria-label="Close edit form"
              >
                ×
              </button>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="edit-title"
                className="mb-2 block text-sm text-slate-300"
              >
                Transaction Title
              </label>

              <input
                id="edit-title"
                type="text"
                name="title"
                value={editingTransaction.title}
                onChange={handleEditChange}
                required
                maxLength={100}
                className={inputClass}
              />
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="edit-amount"
                className="mb-2 block text-sm text-slate-300"
              >
                Amount (₹)
              </label>

              <input
                id="edit-amount"
                type="number"
                name="amount"
                value={editingTransaction.amount}
                onChange={handleEditChange}
                min="0.01"
                step="0.01"
                required
                className={inputClass}
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label
                htmlFor="edit-type"
                className="mb-2 block text-sm text-slate-300"
              >
                Transaction Type
              </label>

              <select
                id="edit-type"
                name="transaction_type"
                value={editingTransaction.transaction_type}
                onChange={handleEditChange}
                className={inputClass}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="edit-category"
                className="mb-2 block text-sm text-slate-300"
              >
                Category
              </label>

              <input
                id="edit-category"
                type="text"
                name="category"
                value={editingTransaction.category}
                onChange={handleEditChange}
                maxLength={50}
                required
                className={inputClass}
              />
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="edit-date"
                className="mb-2 block text-sm text-slate-300"
              >
                Date
              </label>

              <input
                id="edit-date"
                type="date"
                name="date"
                value={editingTransaction.date}
                onChange={handleEditChange}
                required
                className={inputClass}
              />
            </div>

            {/* Error Message */}
            {editError && (
              <p role="alert" className="text-sm text-red-400">
                {editError}
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => setEditingTransaction(null)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Transaction;
