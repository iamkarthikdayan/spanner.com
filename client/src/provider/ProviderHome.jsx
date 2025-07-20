import React, { useEffect, useState } from "react";
import "./ProviderHome.css";

function ProviderHome() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  // ✅ Load requests safely
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];
    const storedAccepted = JSON.parse(localStorage.getItem("acceptedRequests")) || [];
    setRequests(storedRequests);
    setAcceptedRequests(storedAccepted);
  }, []);

  const handleAccept = (req) => {
    const updatedRequests = requests.filter((r) => r.id !== req.id);
    const updatedAccepted = [...acceptedRequests, req];

    setRequests(updatedRequests);
    setAcceptedRequests(updatedAccepted);

    localStorage.setItem("pendingRequests", JSON.stringify(updatedRequests));
    localStorage.setItem("acceptedRequests", JSON.stringify(updatedAccepted));

    alert(`✅ Accepted request from ${req.user?.name || "Unknown User"}`);
  };

  const handleReject = (req) => {
    const updatedRequests = requests.filter((r) => r.id !== req.id);
    setRequests(updatedRequests);
    localStorage.setItem("pendingRequests", JSON.stringify(updatedRequests));
    alert(`❌ Rejected request from ${req.user?.name || "Unknown User"}`);
  };

  return (
    <div className="provider-home">
      {/* HEADER SECTION */}
      <header className="provider-header">
        <h1 className="provider-title">🔧 Welcome, Mechanic!</h1>
        <p className="provider-subtitle">
          Here are the latest service requests from users in your area
        </p>
      </header>

      {/* PENDING REQUESTS */}
      <section className="provider-section">
        <h2 className="section-title">📩 Pending Requests</h2>
        {requests.length > 0 ? (
          <div className="request-grid">
            {[...requests] // ✅ Make a copy
              .sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt)) // ✅ Sort latest first
              .map((req, index) => (
                <div className="request-card" key={index}>
                  <div className="request-content">
                    <h3>{req.mechanic?.name || "Unknown Mechanic"}</h3>
                    <p><strong>User:</strong> {req.user?.name || "Unknown User"}</p>
                    <p><strong>Location:</strong> {req.user?.location || "Not provided"}</p>
                    <p><strong>Contact:</strong> {req.user?.phoneno || "N/A"}</p>
                    <p>
                      <strong>Requested At:</strong>{" "}
                      {req.requestedAt ? new Date(req.requestedAt).toLocaleString() : "N/A"}
                    </p>
                  </div>

                  <div className="request-buttons">
                    <button className="accept-btn" onClick={() => handleAccept(req)}>✅ Accept</button>
                    <button className="reject-btn" onClick={() => handleReject(req)}>❌ Reject</button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="empty-text">🎉 No new requests right now</p>
        )}
      </section>

      {/* ACCEPTED REQUESTS */}
      <section className="provider-section">
        <h2 className="section-title">✅ Accepted Requests</h2>
        {acceptedRequests.length > 0 ? (
          <div className="request-grid">
            {acceptedRequests.map((req, index) => (
              <div className="request-card accepted" key={index}>
                <div className="request-content">
                  <h3>{req.mechanic?.name || "Unknown Mechanic"}</h3>
                  <p><strong>User:</strong> {req.user?.name || "Unknown User"}</p>
                  <p><strong>Location:</strong> {req.user?.location || "Not provided"}</p>
                  <p><strong>Contact:</strong> {req.user?.phoneno || "N/A"}</p>
                  <p>
                    <strong>Requested At:</strong>{" "}
                    {req.requestedAt ? new Date(req.requestedAt).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text">No accepted requests yet</p>
        )}
      </section>
    </div>
  );
}

export default ProviderHome;
