import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {
  Wallet,
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ShieldCheck,
  LoaderCircle,
  ArrowUpRight,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

// ];

const AnalyticsPreview = () => {
  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#151d2b] p-6 sm:p-8">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Financial Intelligence
            </span>
          </div>

          <h1 className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl xl:text-4xl">
            Take Control of Your
            <span className="block text-emerald-400">Financial Future.</span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Track expenses, understand spending patterns, and make smarter
            financial decisions. Everything you need to manage your money.
          </p>
        </div>
      </div>

      {/* Balance Card */}
      <div className="rounded-2xl border border-white/5 bg-[#151d2b] p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Total Net Balance
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                ₹1,24,580
              </h2>

              <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                <TrendingUp size={13} />
                +14.2%
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-[#202c3a] p-3 text-cyan-400">
            <Wallet size={22} />
          </div>
        </div>

        {/* Trend Chart */}
        <div className="mt-6 flex justify-between text-[10px] uppercase tracking-wider text-slate-500">
          <span>May 01</span>
          <span className="text-emerald-400">30-Day Trend</span>
          <span>Current</span>
        </div>

        <svg
          viewBox="0 0 340 90"
          preserveAspectRatio="none"
          className="mt-3 h-24 w-full"
          role="img"
          aria-label="Illustrative balance growth chart"
        >
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 75 Q30 65 60 70 T120 54 T180 48 T240 32 T300 18 T340 9 L340 90 L0 90Z"
            fill="url(#balanceGradient)"
          />

          <path
            d="M0 75 Q30 65 60 70 T120 54 T180 48 T240 32 T300 18 T340 9"
            fill="none"
            stroke="#4edea3"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <circle cx="340" cy="9" r="5" fill="#4edea3" />
        </svg>
      </div>

      {/* Expense and Savings Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/5 bg-[#151d2b] p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-slate-400">Expenses</span>
            <TrendingDown size={18} className="text-cyan-400" />
          </div>

          <p className="mt-4 text-xl font-bold text-white">₹28,450</p>

          <p className="mt-1 text-xs text-slate-500">Budget ₹35,000</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#151d2b] p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-slate-400">Savings</span>
            <PiggyBank size={18} className="text-emerald-400" />
          </div>

          <p className="mt-4 text-xl font-bold text-white">₹16,200</p>

          <p className="mt-1 text-xs text-emerald-400">+12.5% this month</p>
        </div>
      </div>

      {/* Spending Distribution */}
    </div>
  );
};

// Main Login Component - RAFCE Format
const Login = () => {
  const navigate = useNavigate();

  const { login, loading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [mobileTab, setMobileTab] = useState("login");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  const busy = loading || isSubmitting;

  // Login Submit Handler
  const onSubmit = async (data) => {
    const success = await login({
      username: data.username.trim(),
      password: data.password,
    });

    if (success) {
      navigate("/dashboard", { replace: true });
    }
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-white/10 bg-[#0c1321] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c1321] font-sans text-[#dce2f6]">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-[110px]" />

      <div className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Header */}
        <header className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#003824] shadow-lg shadow-emerald-500/20">
              <Wallet size={22} strokeWidth={2.5} />
            </span>

            <span className="text-xl font-bold tracking-tight text-white">
              Fin<span className="text-emerald-400">Track</span>
            </span>
          </Link>

          <span className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-2 text-xs text-slate-400">
            <LockKeyhole size={13} className="text-emerald-400" />
            Personal Finance
          </span>
        </header>

        <main className="py-6 lg:py-12">
          {/* Mobile Tab Switcher */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-[#151d2b] p-1 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileTab("login")}
              className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                mobileTab === "login"
                  ? "bg-[#283443] text-emerald-400"
                  : "text-slate-400"
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                mobileTab === "preview"
                  ? "bg-[#283443] text-emerald-400"
                  : "text-slate-400"
              }`}
            >
              Analytics Preview
            </button>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-12 xl:gap-12">
            {/* Left Analytics Section */}
            <section
              className={`lg:col-span-7 ${
                mobileTab === "preview" ? "block" : "hidden lg:block"
              }`}
            >
              <AnalyticsPreview />
            </section>

            {/* Right Login Section */}
            <section
              className={`lg:col-span-5 ${
                mobileTab === "login" ? "block" : "hidden lg:block"
              }`}
            >
              <div className="sticky top-8 overflow-hidden rounded-3xl border border-white/5 bg-[#151d2b]/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
                {/* Top Gradient Border */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-600" />

                {/* Login Heading */}
                <div className="mb-9 flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      Your Financial Workspace
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-white">
                      Welcome Back
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Sign in to continue managing your finances.
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#0c1321] p-3 text-emerald-400">
                    <ShieldCheck size={25} />
                  </div>
                </div>

                {/* Backend Error */}
                {error && (
                  <div
                    role="alert"
                    className="mb-6 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-300"
                  >
                    {error}
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Username */}
                  <div className="mb-5">
                    <label
                      htmlFor="login-username"
                      className="mb-2 block text-xs font-semibold text-slate-300"
                    >
                      Username
                    </label>

                    <div className="relative">
                      <UserRound
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-3.5 text-slate-500"
                      />

                      <input
                        id="login-username"
                        type="text"
                        autoComplete="username"
                        placeholder="Enter your username"
                        aria-invalid={!!errors.username}
                        className={inputClass}
                        {...register("username", {
                          required: "Username is required",
                          validate: (value) =>
                            value.trim().length > 0 ||
                            "Username cannot be empty",
                        })}
                      />
                    </div>

                    {errors.username && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-6">
                    <label
                      htmlFor="login-password"
                      className="mb-2 block text-xs font-semibold text-slate-300"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-3.5 text-slate-500"
                      />

                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        aria-invalid={!!errors.password}
                        className={`${inputClass} pr-12`}
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-3 rounded-lg p-1 text-slate-500 transition hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={busy}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4edea3] font-semibold text-[#003824] shadow-lg shadow-emerald-500/15 transition hover:bg-[#6ffbbe] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {busy ? (
                      <>
                        <LoaderCircle size={19} className="animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={19} />
                      </>
                    )}
                  </button>
                </form>

                {/* Register Link */}
                <div className="mt-8 border-t border-white/10 pt-7 text-center">
                  <p className="text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>

                {/* Footer Badge */}
                <div className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#0c1321]/70 px-3 py-3 text-center text-xs text-slate-500">
                  <ShieldCheck size={15} className="text-emerald-400" />
                  Your financial workspace, organized.
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ArrowUpRight size={15} className="text-emerald-400" />
                Smarter Spending Starts Here
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-7 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} FinTrack. Take Control of Your Finances.
        </footer>
      </div>
    </div>
  );
};

export default Login;
