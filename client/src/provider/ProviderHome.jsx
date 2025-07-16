import React, { useEffect, useState } from "react";
import "./ProviderHome.css";

function ProviderHome() {
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loggedInProvider, setLoggedInProvider] = useState(null);

  // Load logged-in provider & filter requests
  useEffect(() => {
    const provider = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInProvider(provider);

    const storedRequests = JSON.parse(localStorage.getItem("repairRequests")) || [];
    const storedAccepted = JSON.parse(localStorage.getItem("acceptedRequests")) || [];

    if (provider?.role === "provider") {
      // ✅ Show only requests for THIS provider
      const filteredRequests = storedRequests.filter(
        (r) => r.providerName === provider.name
      );
      const filteredAccepted = storedAccepted.filter(
        (r) => r.providerName === provider.name
      );

      setRequests(filteredRequests);
      setAcceptedRequests(filteredAccepted);
    }
  }, []);

  const handleAccept = (req) => {
    const updatedRequests = requests.filter((r) => r.id !== req.id);
    const updatedAccepted = [...acceptedRequests, req];

    setRequests(updatedRequests);
    setAcceptedRequests(updatedAccepted);

    // Update localStorage
    const allRequests = JSON.parse(localStorage.getItem("repairRequests")) || [];
    const remainingAll = allRequests.filter((r) => r.id !== req.id);
    localStorage.setItem("repairRequests", JSON.stringify(remainingAll));

    const allAccepted = JSON.parse(localStorage.getItem("acceptedRequests")) || [];
    localStorage.setItem("acceptedRequests", JSON.stringify([...allAccepted, req]));

    alert(`✅ Accepted request from ${req.userName}`);
  };

  const handleReject = (req) => {
    const updatedRequests = requests.filter((r) => r.id !== req.id);
    setRequests(updatedRequests);

    // Remove from global storage
    const allRequests = JSON.parse(localStorage.getItem("repairRequests")) || [];
    const remainingAll = allRequests.filter((r) => r.id !== req.id);
    localStorage.setItem("repairRequests", JSON.stringify(remainingAll));

    alert(`❌ Rejected request from ${req.userName}`);
  };

  if (!loggedInProvider || loggedInProvider.role !== "provider") {
    return (
      <div className="provider-home">
        <h2>⚠ Access Denied</h2>
        <p>Only providers can view this page.</p>
      </div>
    );
  }

  return (
    <div className="provider-home">
      {/* HEADER SECTION */}
      <header className="provider-header">
        <h1 className="provider-title">🔧 Welcome, {loggedInProvider.name}!</h1>
        <p className="provider-subtitle">
          Here are your latest service requests
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
          <p className="empty-text">🎉 No new requests for you right now</p>
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
