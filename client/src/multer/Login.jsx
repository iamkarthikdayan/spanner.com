import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      alert("Please select your role.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!data.success) {
        alert("❌ Invalid credentials");
        return;
      }

      // ✅ Save logged-in user
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      alert(`✅ Login successful as ${data.user.role}!`);

      // ✅ Redirect based on role
      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "provider") navigate("/provider-home");
      else navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="login-logo">
          <img src={Logo} alt="Logo" className="login-logo-img" />
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
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Email */}
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

        {/* Password */}
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
            >
              <i className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`} />
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="login-actions">
          <button type="submit" className="login-btn">Login</button>
        </div>

        <div className="login-links">
          <a href="/register">Don't have an account? Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
