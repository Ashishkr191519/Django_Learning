import React from "react";
import { NavLink, Outlet } from "react-router";
import useAuth from "../features/auth/hooks/useAuth";
const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: "◈" },
  { label: "Transactions", path: "/dashboard/transactions", icon: "⇄" },
  { label: "Add Transaction", path: "/dashboard/add", icon: "+" },
  { label: "Analytics", path: "/dashboard/analytics", icon: "▥" },
  { label: "Budgets", path: "/dashboard/budgets", icon: "◉" },
  { label: "Categories", path: "/dashboard/categories", icon: "▦" },
];

const DashboardLayout = () => {
  const { logout, loading, user } = useAuth();
  return (
    <div className="min-h-screen bg-[#080d1c] text-white lg:flex">
      {/* Sidebar */}
      <aside className="border-b border-white/10 bg-[#0c1225] p-5 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:border-b-0 lg:border-r">
        <div className="mb-8 flex items-center gap-3">
          <img
            src="/Neon E Finance App Logo.png"
            alt="ExpenseFlow Logo"
            className="h-11 w-11 rounded-xl object-cover shadow-[0_0_25px_#7c3aed55]"
          />
          <span className="text-xl font-bold tracking-tight">ExpenseFlow</span>
          <span className="rounded-full bg-violet-500/20 px-2 py-1 text-[10px] text-violet-300">
            PRO
          </span>
        </div>

        <p className="mb-4 text-xs font-semibold tracking-widest text-slate-500">
          WORKSPACE
        </p>

        <nav className="flex gap-2 overflow-x-auto lg:flex-col">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                  isActive
                    ? "border border-violet-400/40 bg-gradient-to-r from-violet-600/70 to-indigo-700/40 font-semibold text-white shadow-[0_0_22px_#7c3aed55]"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span className="w-5 text-center text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto hidden border-t border-white/10 pt-5 lg:block">
          <div className="mt-auto border-t border-white/10 pt-5">
            {/* User Profile */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {user?.username || "My Account"}
                </p>
                <p className="text-xs text-slate-400">Personal Workspace</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              disabled={loading}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>⏻</span>
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="min-w-0 flex-1">
        <header>
          {/* <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-xs text-slate-400">
              Manage your finances and achieve your goals.
            </p>
          </div> */}

          {/* <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-400 sm:block">
              ExpenseFlow Workspace
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 font-semibold text-violet-300">
              U
            </div>
          </div> */}
        </header>

        <main className="min-h-[calc(100vh-5rem)] p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
