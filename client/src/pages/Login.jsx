import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.role) {
      alert("Please select your role.");
      return;
    }
    alert("Login submitted!");
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="login-logo">
          <img
            src={Logo}
            alt="iFixit Logo"
            className="login-logo-img"
          />
        </div>
        <h2 className="login-title">Sign in to your account</h2>
        <div className="login-field">
          <label htmlFor="role">Sign in as</label>
          <select
            id="role"
            name="role"
            required
            value={form.role}
            onChange={handleChange}
            className="login-select"
          >
            <option value="">Select...</option>
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>
        </div>
        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
          />
        </div>
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <div className="login-password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
            />
            <button
              type="button"
              className="login-showpass-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`}></i>
            </button>
          </div>
        </div>
        <div className="login-actions">
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </div>
        <div className="login-links">
          <Link to="#">Forgot password?</Link>
          <span>·</span>
          <Link to="/register">Create account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;