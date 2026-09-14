import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FileText, LayoutDashboard, History, LogOut } from 'lucide-react';

export default function Layout({ children }) {
  const nav = useNavigate();

  return (
    <div className="app-shell text-slate-100">
      <div className="floating-orb w-64 h-64 bg-violet-500 top-20 left-0" />
      <div className="floating-orb w-72 h-72 bg-cyan-400 right-10 top-28" />

      <header className="relative border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="font-bold text-xl flex gap-2 items-center text-white">
            <span className="bg-gradient-to-br from-violet-500 to-cyan-400 text-white p-2 rounded-xl shadow-lg shadow-violet-500/30">
              <FileText size={18} />
            </span>
            ResumeIQ
          </Link>

          <button
            className="text-sm text-slate-200 flex gap-2 items-center px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            onClick={() => {
              localStorage.clear();
              nav('/login');
            }}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 flex relative z-10">
        <aside className="w-56 py-8 pr-8 hidden md:block">
          <nav className="space-y-2">
            <NavLink to="/dashboard" className="flex gap-3 p-3 rounded-xl text-slate-200 hover:bg-white/5 transition border border-transparent hover:border-cyan-400/30">
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
            <NavLink to="/history" className="flex gap-3 p-3 rounded-xl text-slate-200 hover:bg-white/5 transition border border-transparent hover:border-cyan-400/30">
              <History size={18} /> History
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 py-8">{children}</main>
      </div>

      <footer className="footer-signature relative z-10">
        Made by <span>Shubham Singh</span>
      </footer>
    </div>
  );
}
