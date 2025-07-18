import React from "react";
import "./UserDashboard.css";
import { FaTimes } from "react-icons/fa";

function UserDashboard({ onClose, user }) {
  return (
    <div className="dashboard-overlay">
      <div className="dashboard-panel">
        <div className="dashboard-header">
          <h3>Welcome, {user?.name || "User"} 👋</h3>
          <button className="dashboard-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="dashboard-content">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phoneno}</p>
          <p><strong>Location:</strong> {user?.location}</p>

          <hr />
          <h4>Your Services</h4>
          <ul>
            <li>AC Repair History</li>
            <li>Washing Machine Repairs</li>
            <li>Pending Requests</li>
          </ul>

          <button
            className="dashboard-logout-btn"
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
