import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {
  Wallet,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ShieldCheck,
  CheckCircle2,
  Circle,
  LoaderCircle,
  ChartNoAxesCombined,
} from "lucide-react";

import useAuth from "../hooks/useAuth";

const categories = [
  { name: "Food", value: 34, color: "#4edea3" },
  { name: "Shopping", value: 22, color: "#4cd7f6" },
  { name: "Transport", value: 18, color: "#9ba2bb" },
  { name: "Bills", value: 16, color: "#10b981" },
  { name: "Others", value: 10, color: "#576174" },
];

const FinancialPreview = () => {
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#151d2b] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Smarter Financial Management
          </div>

          <h1 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Take Control of Your
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Financial Future.
            </span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            Start your journey toward smarter financial management. Track
            expenses, understand your spending habits and organize your savings.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#151d2b] p-6 shadow-xl sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Total Balance
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white">
              ₹1,24,580
              <span className="text-sm font-medium text-emerald-400">.00</span>
            </h2>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-400">
            <TrendingUp size={14} />
            +12.5%
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-400">
          ₹13,840 higher than last month's milestone
        </p>

        <svg
          viewBox="0 0 340 90"
          preserveAspectRatio="none"
          className="mt-6 h-24 w-full"
          role="img"
          aria-label="Illustrative balance trend"
        >
          <defs>
            <linearGradient
              id="registerChartGradient"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#4edea3" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4edea3" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 75 C45 65 55 42 100 50 S165 32 210 38 S280 18 340 8 L340 90 L0 90Z"
            fill="url(#registerChartGradient)"
          />

          <path
            d="M0 75 C45 65 55 42 100 50 S165 32 210 38 S280 18 340 8"
            stroke="#4edea3"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          <circle cx="340" cy="8" r="5" fill="#4edea3" />
        </svg>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#232a39] p-4">
            <div className="mb-3 flex items-center gap-2">
              <TrendingDown size={17} className="text-rose-300" />
              <span className="text-xs text-slate-400">Monthly Expenses</span>
            </div>

            <p className="text-xl font-bold text-white">₹28,450</p>

            <p className="mt-1 text-xs text-slate-500">48 transactions</p>
          </div>

          <div className="rounded-xl bg-[#232a39] p-4">
            <div className="mb-3 flex items-center gap-2">
              <PiggyBank size={17} className="text-emerald-400" />
              <span className="text-xs text-slate-400">Monthly Savings</span>
            </div>

            <p className="text-xl font-bold text-emerald-400">₹16,200</p>

            <p className="mt-1 text-xs text-slate-500">36% of net cashflow</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Top Spend Allocations
            </p>

            <span className="text-xs text-cyan-400">100% Total</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center gap-2 rounded-lg bg-[#2e3544] px-3 py-2 text-xs"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: category.color,
                  }}
                />

                <span className="text-slate-300">{category.name}</span>

                <span
                  className="font-semibold"
                  style={{
                    color: category.color,
                  }}
                >
                  {category.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#2e3544]/70 p-3">
          <ChartNoAxesCombined
            size={18}
            className="shrink-0 text-emerald-400"
          />

          <p className="text-xs leading-5 text-slate-400">
            Illustrative dashboard preview. Your own financial data will appear
            after setup.
          </p>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();

  // Existing custom hook
  const { register: registerUser, loading, error } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [mobileTab, setMobileTab] = useState("register");
  const [successMessage, setSuccessMessage] = useState("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const password = watch("password") || "";
  const username = watch("username") || "";
  const email = watch("email") || "";

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Contains at least 1 number",
      valid: /\d/.test(password),
    },
    {
      label: "Contains at least 1 special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const allPasswordRulesValid = passwordRules.every((rule) => rule.valid);

  const usernameValid = /^[\w.@+-]{3,150}$/.test(username);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const busy = loading || isSubmitting;

  // Submit form to Django backend
  const onSubmit = async (data) => {
    setSuccessMessage("");

    const success = await registerUser({
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password,
    });

    if (success) {
      setSuccessMessage(
        "Account created successfully! Redirecting to login...",
      );

      // Registration does not automatically log the user in.
      navigate("/", {
        replace: true,
      });
    }
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-white/10 bg-[#070e1c] pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/10";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c1321] font-sans text-[#dce2f6]">
      {/* Background Effects */}
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
              Fin
              <span className="text-emerald-400">Track</span>
            </span>
          </Link>

          <span className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-2 text-xs text-slate-400">
            <LockKeyhole size={13} className="text-emerald-400" />
            Personal Finance
          </span>
        </header>

        <main className="py-6 lg:py-12">
          {/* Mobile Tabs */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-[#151d2b] p-1 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileTab("register")}
              className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                mobileTab === "register"
                  ? "bg-[#283443] text-emerald-400"
                  : "text-slate-400"
              }`}
            >
              Create Account
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
            {/* Financial Analytics */}
            <section
              className={`lg:col-span-7 ${
                mobileTab === "preview" ? "block" : "hidden lg:block"
              }`}
            >
              <FinancialPreview />
            </section>

            {/* Registration Form */}
            <section
              className={`lg:col-span-5 ${
                mobileTab === "register" ? "block" : "hidden lg:block"
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#151d2b]/95 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-600" />

                {/* Form Heading */}
                <div className="mb-7 flex items-start justify-between gap-3">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      Join FinTrack
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-white">
                      Create Your Account
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Start your journey toward smarter financial management.
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
                    className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-300"
                  >
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {successMessage && (
                  <div
                    role="status"
                    className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-400"
                  >
                    <CheckCircle2 size={18} />
                    {successMessage}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-5"
                >
                  {/* Username */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <label
                        htmlFor="register-username"
                        className="text-xs font-semibold text-slate-300"
                      >
                        Username
                      </label>

                      {usernameValid && (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <CheckCircle2 size={13} />
                          Valid format
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <UserRound
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-3.5 text-slate-500"
                      />

                      <input
                        id="register-username"
                        type="text"
                        autoComplete="username"
                        placeholder="e.g. rohan_sharma"
                        aria-invalid={!!errors.username}
                        className={inputClass}
                        {...register("username", {
                          required: "Username is required",
                          minLength: {
                            value: 3,
                            message: "Username must have at least 3 characters",
                          },
                          maxLength: {
                            value: 150,
                            message: "Username is too long",
                          },
                          pattern: {
                            value: /^[\w.@+-]+$/,
                            message:
                              "Only letters, numbers and @ . + - _ allowed",
                          },
                        })}
                      />

                      {usernameValid && (
                        <CheckCircle2
                          size={18}
                          className="pointer-events-none absolute right-3.5 top-3.5 text-emerald-400"
                        />
                      )}
                    </div>

                    {errors.username ? (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.username.message}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-slate-500">
                        Your unique identifier for FinTrack.
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <label
                        htmlFor="register-email"
                        className="text-xs font-semibold text-slate-300"
                      >
                        Email Address
                      </label>

                      <span className="text-[11px] text-slate-500">
                        Personal or Work
                      </span>
                    </div>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="pointer-events-none absolute left-3.5 top-3.5 text-slate-500"
                      />

                      <input
                        id="register-email"
                        type="email"
                        autoComplete="email"
                        placeholder="rohan@example.com"
                        aria-invalid={!!errors.email}
                        className={inputClass}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                      />

                      {emailValid && (
                        <CheckCircle2
                          size={18}
                          className="pointer-events-none absolute right-3.5 top-3.5 text-emerald-400"
                        />
                      )}
                    </div>

                    {errors.email && (
                      <p className="mt-2 text-xs text-rose-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="register-password"
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
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        aria-invalid={!!errors.password}
                        className={inputClass}
                        {...register("password", {
                          required: "Password is required",
                          validate: () =>
                            allPasswordRulesValid ||
                            "Please meet all password requirements",
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

                    {/* Live Password Checklist */}
                    <div className="mt-3 rounded-xl bg-[#070e1c]/80 p-4">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Security Requirements
                      </p>

                      <div className="space-y-2.5">
                        {passwordRules.map((rule) => (
                          <div
                            key={rule.label}
                            className={`flex items-center gap-2 text-xs transition-colors ${
                              rule.valid ? "text-emerald-400" : "text-slate-500"
                            }`}
                          >
                            {rule.valid ? (
                              <CheckCircle2 size={15} />
                            ) : (
                              <Circle size={15} />
                            )}

                            {rule.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={busy}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4edea3] font-semibold text-[#003824] shadow-lg shadow-emerald-500/15 transition hover:bg-[#6ffbbe] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {busy ? (
                      <>
                        <LoaderCircle size={19} className="animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight size={19} />
                      </>
                    )}
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-8 border-t border-white/10 pt-7 text-center">
                  <p className="text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link
                      to="/"
                      className="font-semibold text-emerald-400 transition hover:text-emerald-300"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>

                <div className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#0c1321]/70 p-3 text-xs text-slate-500">
                  <ShieldCheck size={15} className="text-emerald-400" />
                  Your financial journey starts here.
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="border-t border-white/5 py-7 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} FinTrack. Take Control of Your Finances.
        </footer>
      </div>
    </div>
  );
};

export default Register;
