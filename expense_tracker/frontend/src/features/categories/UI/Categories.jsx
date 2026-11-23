import React, { useState } from "react";
import useCategories from "../hooks/useCategories";

const Icons = {
  grid: "▦",
  income: "↗",
  expense: "↘",
  edit: "✎",
  delete: "×",
  plus: "+",
};

const Categories = () => {
  const {
    categories,
    loading,
    error,
    createCategory,
    editCategory,
    removeCategory,
  } = useCategories();

  const [filter, setFilter] = useState("all");
  const [name, setName] = useState("");
  const [categoryType, setCategoryType] = useState("expense");
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const incomeCount = categories.filter(
    (c) => c.category_type === "income",
  ).length;

  const expenseCount = categories.filter(
    (c) => c.category_type === "expense",
  ).length;

  const filteredCategories = categories.filter(
    (c) => filter === "all" || c.category_type === filter,
  );

  const getError = (err) => {
    const value = err?.name || err?.category_type || err?.error || err?.detail;

    if (Array.isArray(value)) return value[0];
    if (typeof value === "string") return value;

    return "Something went wrong. Please try again.";
  };

  const resetForm = () => {
    setName("");
    setCategoryType("expense");
    setEditingId(null);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Please enter a category name.");
      return;
    }

    setSaving(true);

    try {
      const data = {
        name: name.trim(),
        category_type: categoryType,
      };

      if (editingId !== null) {
        await editCategory(editingId, data);
      } else {
        await createCategory(data);
      }

      resetForm();
    } catch (err) {
      setFormError(getError(err));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setCategoryType(category.category_type);
    setFormError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    setDeletingId(id);
    setFormError("");

    try {
      await removeCategory(id);

      if (editingId === id) resetForm();
    } catch (err) {
      setFormError(getError(err));
    } finally {
      setDeletingId(null);
    }
  };

  const stats = [
    {
      label: "Total Categories",
      value: categories.length,
      icon: Icons.grid,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      label: "Income Categories",
      value: incomeCount,
      icon: Icons.income,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Expense Categories",
      value: expenseCount,
      icon: Icons.expense,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
  ];

  return (
    <div className="min-h-full bg-[#080d1d] px-4 py-7 text-slate-100 sm:px-7 lg:px-9">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Financial Workspace
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Categories
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Organize and manage your financial categories.
          </p>
        </div>

        <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
          ExpenseFlow Manager
        </span>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#252d45] bg-[#11182b] p-5 transition hover:border-violet-500/30"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-slate-400">
                {stat.label}
              </span>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border text-2xl ${stat.bg} ${stat.color} ${stat.border}`}
              >
                {stat.icon}
              </div>
            </div>

            <div className="mt-3 text-3xl font-bold text-white">
              {stat.value}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Your personal workspace
            </p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-[#29314b] bg-[#11182b]">
        <div className="flex items-center justify-between border-b border-[#252d45] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {editingId !== null ? "Edit Category" : "Create New Category"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {editingId !== null
                ? "Update your category details"
                : "Add a category to organize your transactions"}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-2xl text-violet-400">
            {Icons.plus}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Food, Shopping, Salary"
                maxLength={50}
                className="w-full rounded-xl border border-[#303953] bg-[#0b1122] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category Type
              </label>

              <select
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                className="w-full rounded-xl border border-[#303953] bg-[#0b1122] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          {formError && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400"
            >
              {formError}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Save Changes"
                  : "+ Add Category"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-[#303953] px-6 py-3 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Category List */}
      <div className="overflow-hidden rounded-2xl border border-[#29314b] bg-[#11182b]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#252d45] px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Your Categories
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              View and manage all your categories
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["all", "income", "expense"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                  filter === type
                    ? "bg-violet-600 text-white"
                    : "border border-[#303953] bg-[#0b1122] text-slate-400 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="py-14 text-center text-slate-400">
              Loading categories...
            </div>
          ) : error ? (
            <div className="py-14 text-center text-rose-400">
              Failed to load categories.
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center py-14 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-3xl text-violet-400">
                ▦
              </div>

              <h3 className="text-lg font-semibold text-white">
                No categories yet
              </h3>

              <p className="mt-2 max-w-sm text-sm text-slate-400">
                Create your first category to start organizing your income and
                expenses.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {filteredCategories.map((category) => {
                const isIncome = category.category_type === "income";

                return (
                  <div
                    key={category.id}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-[#29314b] bg-[#0c1325] p-4 transition hover:border-violet-500/40 hover:bg-[#111b33]"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                          isIncome
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {isIncome ? "↗" : "↘"}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-white">
                          {category.name}
                        </h3>

                        <span
                          className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            isIncome
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-rose-500/10 text-rose-400"
                          }`}
                        >
                          {isIncome ? "Income" : "Expense"}
                        </span>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        aria-label={`Edit ${category.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#303953] text-lg text-slate-400 transition hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-400"
                      >
                        {Icons.edit}
                      </button>

                      <button
                        onClick={() => handleDelete(category.id)}
                        disabled={deletingId === category.id}
                        aria-label={`Delete ${category.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#303953] text-xl text-slate-400 transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-50"
                      >
                        {deletingId === category.id ? "…" : Icons.delete}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
