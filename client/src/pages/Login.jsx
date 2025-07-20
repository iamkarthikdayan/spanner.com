import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.role) {
      alert("Please select your role.");
      return;
    }

    // ✅ Choose correct storage (users OR providers)
    const storageKey = form.role === "provider" ? "providers" : "users";
    const storedAccounts = JSON.parse(localStorage.getItem(storageKey)) || [];

    const matched = storedAccounts.find(
      (acc) => acc.email === form.email && acc.password === form.password
    );

    if (matched) {
      localStorage.setItem("loggedInUser", JSON.stringify(matched));
      alert(`Login successful as ${form.role}!`);

      // ✅ Redirect based on role
      if (form.role === "provider") {
        navigate("/provider-home");
      } else {
        navigate("/");
      }
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="login-logo">
          <img
            src={Logo}
            alt="Spanner.com Logo"
            className="login-logo-img"
            style={{ height: 60, width: "auto", marginBottom: 8 }}
          />
        </div>
        <h2 className="login-title">Login to your account</h2>

        {/* Role Selection */}
        <div className="login-field">
          <label htmlFor="role">Login as</label>
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

        {/* Email Field */}
        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
          />
        </div>

        {/* Password Field */}
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <div className="login-password-wrap">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="login-showpass-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`} />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="login-actions">
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>

        {/* Links */}
        <div className="login-links">
          <a href="/register">Don't have an account? Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
