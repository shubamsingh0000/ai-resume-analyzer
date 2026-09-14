import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Auth({ mode }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const d = await api('/auth/' + mode, { method: 'POST', body: JSON.stringify(form) });
      localStorage.setItem('token', d.token);
      nav('/dashboard');
    } catch (x) {
      setError(x.message);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 relative overflow-hidden">
      <div className="floating-orb w-56 h-56 bg-violet-500 top-12 left-12" />
      <div className="floating-orb w-60 h-60 bg-cyan-400 bottom-10 right-10" />

      <div className="bg-gradient-to-br from-slate-950 via-violet-950 to-cyan-950 text-white p-12 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto animated-panel">
          <div className="text-cyan-300 font-bold text-xl mb-10 tracking-[0.22em] uppercase">ResumeIQ</div>
          <h1 className="text-5xl font-bold leading-tight">Turn your resume into your next opportunity.</h1>
          <p className="text-slate-300 mt-6 text-lg">Get practical, ATS-friendly feedback in seconds with a smart futuristic workflow.</p>

          <div className="mt-10 grid grid-cols-3 gap-3 text-sm">
            {['ATS', 'Skills', 'Insights'].map((item) => (
              <div key={item} className="sheen rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center font-medium text-slate-100">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 relative">
        <form onSubmit={submit} className="card p-8 w-full max-w-md animated-panel text-slate-100">
          <h2 className="text-2xl font-bold text-white">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <p className="text-slate-300 mt-2 mb-6">{mode === 'login' ? 'Sign in to continue.' : 'Start analyzing for free.'}</p>

          {mode === 'register' && (
            <input
              className="input mb-3"
              placeholder="Full name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}

          <input
            className="input mb-3"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="input mb-3"
            type="password"
            placeholder="Password (6+ characters)"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

          <button className="btn btn-primary w-full mt-2">
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </button>

          <p className="text-center text-sm mt-5 text-slate-300">
            {mode === 'login' ? (
              <>
                New here? <Link className="text-cyan-300 font-semibold" to="/register">Create an account</Link>
              </>
            ) : (
              <>
                Already have an account? <Link className="text-cyan-300 font-semibold" to="/login">Sign in</Link>
              </>
            )}
          </p>
        </form>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-slate-300">
        Made by <span className="font-semibold text-cyan-300">Shubham Singh</span>
      </div>
    </div>
  );
}
