import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/logo.png"; // Use your logo path

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }
    // Handle signup logic here
    alert("Signup submitted!");
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
        <h2 className="login-title">Create your account</h2>
        <div className="login-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
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
              autoComplete="new-password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
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
        <div className="login-field">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            name="confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={form.confirm}
            onChange={handleChange}
            placeholder="Repeat your password"
          />
        </div>
        <div className="login-actions">
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </div>
        <div className="login-links">
          <a href="/login">Already have an account?</a>
        </div>
      </form>
    </div>
  );
}

export default Register;