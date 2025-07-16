import React, { useEffect, useState } from "react";
import "./ProviderHome.css";

function ProviderHome() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  // Load requests from localStorage (temporary storage)
  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("repairRequests")) || [];
    setRequests(storedRequests);

    const storedAccepted = JSON.parse(localStorage.getItem("acceptedRequests")) || [];
    setAcceptedRequests(storedAccepted);
  }, []);

  const handleAccept = (req) => {
    const updatedRequests = requests.filter((r) => r.id !== req.id);
    const updatedAccepted = [...acceptedRequests, req];

    setRequests(updatedRequests);
    setAcceptedRequests(updatedAccepted);

    localStorage.setItem("repairRequests", JSON.stringify(updatedRequests));
    localStorage.setItem("acceptedRequests", JSON.stringify(updatedAccepted));

    alert(`✅ Accepted request for ${req.service}`);
  };

  const handleReject = (req) => {
    const updatedRequests = requests.filter((r) => r.id !== req.id);
    setRequests(updatedRequests);
    localStorage.setItem("repairRequests", JSON.stringify(updatedRequests));
    alert(`❌ Rejected request for ${req.service}`);
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
            {requests.map((req) => (
              <div className="request-card" key={req.id}>
                <div className="request-content">
                  <h3>{req.service}</h3>
                  <p><strong>User:</strong> {req.userName}</p>
                  <p><strong>Location:</strong> {req.location}</p>
                  <p><strong>Details:</strong> {req.details}</p>
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
            {acceptedRequests.map((req) => (
              <div className="request-card accepted" key={req.id}>
                <div className="request-content">
                  <h3>{req.service}</h3>
                  <p><strong>User:</strong> {req.userName}</p>
                  <p><strong>Location:</strong> {req.location}</p>
                  <p><strong>Details:</strong> {req.details}</p>
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
