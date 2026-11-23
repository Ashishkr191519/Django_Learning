import React, { useMemo, useState } from "react";
import {
  Wallet,
  Plus,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Target,
  Pencil,
  Trash2,
  X,
  Check,
  AlertTriangle,
  CalendarDays,
  Sparkles,
  PieChart,
  ShieldCheck,
  Loader2,
} from "lucide-react";



import useBudgets from "../hook/useBudgets.js";
import useCategories from "../../categories/hooks/useCategories.js";

const currency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;

const getMonthString = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;

const formatMonth = (date) =>
  date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

const categoryIcons = {
  Food: "🍕",
  Groceries: "🛒",
  Shopping: "🛍️",
  Transport: "🚗",
  Entertainment: "🎬",
  Health: "💊",
  Healthcare: "🏥",
  Education: "📚",
  Travel: "✈️",
  Rent: "🏠",
  Utilities: "⚡",
  "Bills & Utilities": "💡",
  Subscriptions: "📱",
  Others: "💳",
};

const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-rose-500",
  "from-pink-400 to-purple-500",
  "from-indigo-400 to-cyan-500",
];

const getErrorMessage = (error) => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    const first = Object.values(error)[0];
    if (Array.isArray(first)) return String(first[0]);
    if (typeof first === "string") return first;
  }

  return "Something went wrong. Please try again.";
};

const Budgets = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const month = getMonthString(selectedDate);

  const { budgets, loading, error, createBudget, editBudget, removeBudget } =
    useBudgets(month);

  const { categories } = useCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });

  const expenseCategories = useMemo(
    () => categories.filter((category) => category.category_type === "expense"),
    [categories],
  );

  const availableCategories = expenseCategories.filter(
    (category) =>
      !budgets.some(
        (budget) =>
          Number(budget.category) === Number(category.id) &&
          budget.id !== editingBudget?.id,
      ),
  );

  const totalBudget = budgets.reduce(
    (sum, budget) => sum + Number(budget.amount),
    0,
  );

  const totalSpent = budgets.reduce(
    (sum, budget) => sum + Number(budget.spent_amount),
    0,
  );

  const remaining = totalBudget - totalSpent;

  const overallPercentage =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const overBudgetCount = budgets.filter(
    (budget) => Number(budget.spent_amount) > Number(budget.amount),
  ).length;

  const healthyCount = budgets.filter(
    (budget) => Number(budget.spent_amount) <= Number(budget.amount),
  ).length;

  const sortedBudgets = useMemo(
    () =>
      [...budgets].sort(
        (a, b) => Number(b.percentage_used) - Number(a.percentage_used),
      ),
    [budgets],
  );

  const changeMonth = (direction) => {
    setSelectedDate(
      (previous) =>
        new Date(previous.getFullYear(), previous.getMonth() + direction, 1),
    );
  };

  const openCreateModal = () => {
    setEditingBudget(null);
    setFormData({
      category: "",
      amount: "",
    });
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: String(budget.category),
      amount: String(budget.amount),
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setEditingBudget(null);
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const amount = Number(formData.amount);

    if (!formData.category) {
      setFormError("Please select a category.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setFormError("Budget amount must be greater than zero.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        category: Number(formData.category),
        amount: amount.toFixed(2),
        month,
      };

      if (editingBudget) {
        await editBudget(editingBudget.id, payload);
      } else {
        await createBudget(payload);
      }

      setModalOpen(false);
      setEditingBudget(null);
      setFormData({ category: "", amount: "" });
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (budget) => {
    const confirmed = window.confirm(
      `Delete your ${budget.category_name} budget?`,
    );

    if (!confirmed) return;

    setDeletingId(budget.id);

    try {
      await removeBudget(budget.id);
    } catch (err) {
      window.alert(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative min-h-screen space-y-8 overflow-hidden pb-12 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 top-96 h-80 w-80 rounded-full bg-cyan-500/5 blur-[120px]" />

      {/* Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-5">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <Sparkles size={13} />
              SMART MONEY MANAGEMENT
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Budget{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Control
            </span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Take control of your spending. Every rupee counts.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-600/20 transition hover:scale-[1.02] hover:shadow-violet-600/40"
        >
          <Plus size={18} />
          Create Budget
        </button>
      </div>

      {/* Month Selector */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#141a30]/80 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
            <CalendarDays size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Budget Period</p>
            <h3 className="text-lg font-semibold">
              {formatMonth(selectedDate)}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setSelectedDate(new Date())}
            className="rounded-xl border border-white/10 px-4 py-3 text-xs font-medium text-slate-300 transition hover:bg-white/5"
          >
            Current Month
          </button>

          <button
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="relative grid gap-5 md:grid-cols-3">
        <div className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#211c45] via-[#171a36] to-[#11172b] p-6">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <p className="text-sm text-slate-300">Total Allocated</p>
            <div className="rounded-xl bg-violet-500/15 p-3 text-violet-400">
              <Wallet size={21} />
            </div>
          </div>

          <h2 className="relative mt-5 text-3xl font-bold">
            {currency(totalBudget)}
          </h2>

          <div className="relative mt-4 flex items-center gap-2 text-xs text-violet-300">
            <Target size={14} />
            Across {budgets.length} categories
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141a30]/90 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Total Spent</p>
            <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
              <TrendingUp size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-3xl font-bold">{currency(totalSpent)}</h2>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <PieChart size={14} />
            {overallPercentage.toFixed(1)}% of budget used
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141a30]/90 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Remaining Balance</p>
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <TrendingDown size={21} />
            </div>
          </div>

          <h2
            className={`mt-5 text-3xl font-bold ${
              remaining < 0 ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {currency(remaining)}
          </h2>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} />
            {remaining >= 0
              ? "Within allocated budget"
              : "Spending exceeds allocation"}
          </div>
        </div>
      </div>

      {/* Overall Budget Health */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141a30]/90 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="mb-2 flex items-center gap-2 text-violet-400">
              <Sparkles size={16} />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Financial Pulse
              </span>
            </div>

            <h2 className="text-xl font-bold">Monthly Budget Overview</h2>

            <p className="mt-2 text-sm text-slate-400">
              Your spending progress across all budgeted categories
            </p>
          </div>

          <div
            className={`rounded-full border px-4 py-2 text-xs font-medium ${
              overBudgetCount > 0
                ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
                : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {overBudgetCount > 0
              ? `${overBudgetCount} Over Budget`
              : "On Track"}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-400">Budget Utilization</p>
              <h3 className="mt-1 text-3xl font-bold">
                {overallPercentage.toFixed(1)}
                <span className="ml-1 text-lg text-slate-400">%</span>
              </h3>
            </div>

            <p className="text-sm text-slate-400">
              {currency(totalSpent)} / {currency(totalBudget)}
            </p>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${
                overallPercentage > 100
                  ? "from-rose-500 to-orange-400"
                  : "from-violet-600 via-purple-500 to-cyan-400"
              }`}
              style={{
                width: `${Math.min(Math.max(overallPercentage, 0), 100)}%`,
              }}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-xs text-slate-400">Healthy Budgets</p>
              <p className="mt-1 text-xl font-bold text-emerald-400">
                {healthyCount}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">Exceeded Budgets</p>
              <p className="mt-1 text-xl font-bold text-rose-400">
                {overBudgetCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Budgets */}
      <div className="relative space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Category Budgets</h2>
            <p className="mt-1 text-sm text-slate-400">
              Track and manage individual spending limits
            </p>
          </div>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400">
            {budgets.length} Active Budgets
          </span>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
            {getErrorMessage(error)}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20 text-slate-400">
            <Loader2 className="animate-spin" size={20} />
            Loading your budgets...
          </div>
        ) : sortedBudgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#141a30]/60 px-6 py-20 text-center">
            <div className="mb-5 rounded-2xl bg-violet-500/10 p-5 text-violet-400">
              <Target size={34} />
            </div>

            <h3 className="text-xl font-semibold">
              Your budget journey starts here
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Create your first monthly budget and start tracking your spending
              by category.
            </p>

            <button
              onClick={openCreateModal}
              className="mt-6 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
            >
              <Plus size={17} />
              Create First Budget
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sortedBudgets.map((budget, index) => {
              const spent = Number(budget.spent_amount);
              const limit = Number(budget.amount);
              const percentage = limit > 0 ? (spent / limit) * 100 : 0;

              const isExceeded = percentage > 100;
              const isWarning = percentage >= 80 && !isExceeded;

              const gradient = gradients[index % gradients.length];

              const icon = categoryIcons[budget.category_name] || "💳";

              return (
                <div
                  key={budget.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141a30]/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${gradient} opacity-70`}
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl">
                        {icon}
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {budget.category_name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Monthly Limit
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(budget)}
                        aria-label={`Edit ${budget.category_name} budget`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-violet-400"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(budget)}
                        disabled={deletingId === budget.id}
                        aria-label={`Delete ${budget.category_name} budget`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400 disabled:opacity-50"
                      >
                        {deletingId === budget.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="text-xs text-slate-400">Amount Spent</p>

                        <h4 className="mt-1 text-2xl font-bold">
                          {currency(spent)}
                        </h4>
                      </div>

                      <p className="text-sm text-slate-400">
                        of {currency(limit)}
                      </p>
                    </div>

                    <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${
                          isExceeded
                            ? "from-rose-500 to-orange-400"
                            : isWarning
                              ? "from-amber-400 to-orange-500"
                              : gradient
                        }`}
                        style={{
                          width: `${Math.min(Math.max(percentage, 0), 100)}%`,
                        }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`text-xs font-semibold ${
                          isExceeded
                            ? "text-rose-400"
                            : isWarning
                              ? "text-amber-400"
                              : "text-emerald-400"
                        }`}
                      >
                        {percentage.toFixed(1)}% used
                      </span>

                      <span className="text-xs text-slate-400">
                        {isExceeded
                          ? `${currency(spent - limit)} over`
                          : `${currency(limit - spent)} left`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
                    {isExceeded ? (
                      <>
                        <AlertTriangle size={15} className="text-rose-400" />
                        <span className="text-xs text-rose-400">
                          Budget limit exceeded
                        </span>
                      </>
                    ) : isWarning ? (
                      <>
                        <AlertTriangle size={15} className="text-amber-400" />
                        <span className="text-xs text-amber-400">
                          Approaching budget limit
                        </span>
                      </>
                    ) : (
                      <>
                        <Check size={15} className="text-emerald-400" />
                        <span className="text-xs text-emerald-400">
                          Spending on track
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#030712]/85 p-4 backdrop-blur-md"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="budget-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-violet-500/20 bg-[#151a30] p-7 shadow-2xl shadow-violet-950/40"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400" />

            <div className="flex items-start justify-between">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-400">
                  <Target size={22} />
                </div>

                <h2 id="budget-modal-title" className="text-2xl font-bold">
                  {editingBudget ? "Edit Budget" : "Create Budget"}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Set a spending limit for {formatMonth(selectedDate)}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={saving}
                aria-label="Close budget form"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="budget-category"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Expense Category
                </label>

                <select
                  id="budget-category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((previous) => ({
                      ...previous,
                      category: e.target.value,
                    }))
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0c1225] px-4 py-3.5 text-sm text-white outline-none transition focus:border-violet-500"
                >
                  <option value="">Select a category</option>

                  {availableCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {availableCategories.length === 0 && (
                  <p className="mt-2 text-xs text-amber-400">
                    No available expense categories. Create a category first or
                    edit an existing budget.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="budget-amount"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Monthly Budget Amount
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                    ₹
                  </span>

                  <input
                    id="budget-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    placeholder="5000"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData((previous) => ({
                        ...previous,
                        amount: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#0c1225] py-3.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500"
                  />
                </div>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-300"
                >
                  {formError}
                </div>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || availableCategories.length === 0}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-semibold transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={17} />
                      {editingBudget ? "Save Changes" : "Create Budget"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
