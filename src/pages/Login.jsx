import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      console.log("Attempting login with:", { email }); // Debug log
      await login({ email, password });
    } catch (error) {
      console.error("Login error:", error); // Debug log

      // Better error messages
      if (error?.response?.status === 404) {
        setErr("Login endpoint not found. Please check if backend is running.");
      } else if (error?.response?.status === 401) {
        setErr("Invalid email or password.");
      } else if (error?.response?.data?.message) {
        setErr(error.response.data.message);
      } else if (error?.message === "Network Error") {
        setErr("Cannot connect to server. Please ensure backend is running on http://localhost:5000");
      } else {
        setErr("Login failed. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-indigo-600">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">Sign in to continue to MERN Blog</p>
        </div>

        {err && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{err}</span>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
            disabled={busy}
          >
            {busy ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
