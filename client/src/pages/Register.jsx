import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/logo.png";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
    address: "",
    phoneno: "",
    location: "",
    license: null,
    documents: null,
    specialization: [],
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const updated = checked
        ? [...prev.specialization, value]
        : prev.specialization.filter((item) => item !== value);
      return { ...prev, specialization: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }
    if (!form.role) {
      alert("Please select your role.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const emailAlreadyExists = existingUsers.some(
      (user) => user.email === form.email
    );
    if (emailAlreadyExists) {
      alert("This email is already registered.");
      return;
    }

    const userDataToStore = { ...form };
    delete userDataToStore.confirm; // Don't store confirm password

    localStorage.setItem(
      "users",
      JSON.stringify([...existingUsers, userDataToStore])
    );

    alert(`Signup successful as ${form.role}!`);
    console.log("Stored user:", userDataToStore);
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
          <label htmlFor="role">Register as</label>
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

        {(form.role === "user" || form.role === "provider") && (
          <>
            <div className="login-field">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Your address"
              />
            </div>
            <div className="login-field">
              <label htmlFor="phoneno">Phone Number</label>
              <input
                id="phoneno"
                name="phoneno"
                type="tel"
                required
                value={form.phoneno}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>
            <div className="login-field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={form.location}
                onChange={handleChange}
                placeholder="City or area"
              />
            </div>
          </>
        )}

        {form.role === "provider" && (
          <>
            <div className="login-field">
              <label>Specialization</label>
              <div className="checkbox-group">
                {["Air Conditioner", "Refrigerator", "Washing Machine", "Fan", "Others"].map((item) => (
                  <label key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      value={item}
                      checked={form.specialization.includes(item)}
                      onChange={handleCheckboxChange}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="license">License (Upload)</label>
              <input
                id="license"
                name="license"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-field">
              <label htmlFor="documents">Other Documents (Upload)</label>
              <input
                id="documents"
                name="documents"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
              />
            </div>
          </>
        )}

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
              <i className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`} />
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
