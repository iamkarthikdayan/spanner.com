import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import Logo from "../assets/logo.png";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("analysis");
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedProviders = JSON.parse(localStorage.getItem("providers")) || [];
    setUsers(storedUsers);
    setProviders(storedProviders);
  }, []);

  // ✅ Filter members based on search
  const filterMembers = (list) =>
    list.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // ✅ Remove member
  const handleRemove = (type, email) => {
    if (!window.confirm(`Remove ${email}?`)) return;

    if (type === "user") {
      const updated = users.filter((u) => u.email !== email);
      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));
    } else {
      const updated = providers.filter((p) => p.email !== email);
      setProviders(updated);
      localStorage.setItem("providers", JSON.stringify(updated));
    }
  };

  // ✅ Block member
  const handleBlock = (type, email) => {
    alert(`${type === "user" ? "User" : "Provider"} ${email} is blocked!`);
  };

  // ✅ Card Component
  const MemberCard = ({ data, type }) => {
    const [showMore, setShowMore] = useState(false);

    return (
      <div className="admin-card">
        {/* Basic Info */}
        <div className="admin-card-header">
          <div>
            <h4>{data.name}</h4>
            <p className="email">{data.email}</p>
          </div>
          <button
            className="dropdown-toggle"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "▼" : "▶"}
          </button>
        </div>

        {/* Extra Details */}
        {showMore && (
          <div className="admin-card-details">
            {data.phoneno && <p><strong>Phone:</strong> {data.phoneno}</p>}
            {data.location && <p><strong>Location:</strong> {data.location}</p>}
            {type === "provider" && (
              <p><strong>Specialization:</strong> {data.specialization?.join(", ") || "N/A"}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="admin-card-actions">
          <button className="remove-btn" onClick={() => handleRemove(type, data.email)}>Remove</button>
          <button className="block-btn" onClick={() => handleBlock(type, data.email)}>Block</button>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      {/* ✅ LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={Logo} alt="Logo" height="70" />
        </div>
        <nav className="sidebar-menu">
          <button
            className={activeSection === "analysis" ? "active" : ""}
            onClick={() => setActiveSection("analysis")}
          >
            📊 Analysis
          </button>
          <button
            className={activeSection === "users" ? "active" : ""}
            onClick={() => setActiveSection("users")}
          >
            👤 Users
          </button>
          <button
            className={activeSection === "providers" ? "active" : ""}
            onClick={() => setActiveSection("providers")}
          >
            🔧 Providers
          </button>
        </nav>
      </aside>

      {/* ✅ MAIN CONTENT */}
      <main className="main-content">
        {activeSection === "analysis" && (
          <section className="content-section">
            <h1>📊 Analysis Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <h2>{users.length}</h2>
                <p>Total Users</p>
              </div>
              <div className="stat-card">
                <h2>{providers.length}</h2>
                <p>Total Providers</p>
              </div>
              <div className="stat-card">
                <h2>{users.length + providers.length}</h2>
                <p>Total Accounts</p>
              </div>
            </div>
          </section>
        )}

        {/* ✅ USERS SECTION */}
        {activeSection === "users" && (
          <section className="content-section">
            <h1>👤 Registered Users</h1>
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {filterMembers(users).length > 0 ? (
              <div className="admin-card-grid">
                {filterMembers(users).map((u, idx) => (
                  <MemberCard key={idx} data={u} type="user" />
                ))}
              </div>
            ) : (
              <p className="empty-text">No users found</p>
            )}
          </section>
        )}

        {/* ✅ PROVIDERS SECTION */}
        {activeSection === "providers" && (
          <section className="content-section">
            <h1>🔧 Registered Providers</h1>
            <input
              type="text"
              placeholder="Search providers by name or email..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {filterMembers(providers).length > 0 ? (
              <div className="admin-card-grid">
                {filterMembers(providers).map((p, idx) => (
                  <MemberCard key={idx} data={p} type="provider" />
                ))}
              </div>
            ) : (
              <p className="empty-text">No providers found</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
