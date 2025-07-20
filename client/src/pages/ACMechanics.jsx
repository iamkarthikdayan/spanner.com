import React, { useEffect, useState } from "react";
import "./AirConditionerRepair.css";

function ACMechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  useEffect(() => {
    // ✅ Fetch mechanics (static + providers from localStorage)
    const savedProviders = JSON.parse(localStorage.getItem("providers")) || [];
    const formattedProviders = savedProviders.map((p) => ({
      name: p.name,
      location: p.location,
      rating: 4.5, // Default rating for new providers
      experience: "New Provider",
      contact: p.phoneno,
    }));

    // ✅ Combine static + dynamic
    setTimeout(() => {
      setMechanics([
        {
          name: "Suresh Kumar",
          location: "Kochi Central",
          rating: 4.8,
          experience: "8 years",
          contact: "9876543210",
        },
        {
          name: "Anand M.",
          location: "Edappally",
          rating: 4.6,
          experience: "5 years",
          contact: "9847032211",
        },
        ...formattedProviders,
      ]);
    }, 500);
  }, []);

  // ✅ Handle sending request
  const handleSendRequest = (mechanic) => {
    setSelectedMechanic(mechanic);
    setShowPopup(true);
    setCountdown(120);

    // ✅ Get current logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please login before sending a request!");
      return;
    }

    // ✅ Save request to localStorage for provider
    const pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];
    const newRequest = {
      user: loggedInUser,
      mechanic: mechanic,
      requestedAt: new Date().toISOString(),
    };

    localStorage.setItem("pendingRequests", JSON.stringify([...pendingRequests, newRequest]));

    // ✅ Start countdown
    let timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowPopup(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ✅ Format countdown as mm:ss
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <main className="ac-repair-page">
      <section className="ac-faq-section">
        <h2>Top AC Mechanics Near You</h2>
        <div className="mechanics-grid">
          {mechanics.length > 0 ? (
            mechanics.map((mech, index) => (
              <div key={index} className="review-card mechanic-card">
                <h3 style={{ marginBottom: "0.5rem", color: "#003cff" }}>{mech.name}</h3>
                <p><strong>Location:</strong> {mech.location}</p>
                <p><strong>Experience:</strong> {mech.experience}</p>
                <p>
                  <strong>Rating:</strong>{" "}
                  {"★".repeat(Math.floor(mech.rating))}{" "}
                  {"☆".repeat(5 - Math.floor(mech.rating))} ({mech.rating})
                </p>
                <p><strong>Contact:</strong> {mech.contact}</p>
                <button className="send-request-btn" onClick={() => handleSendRequest(mech)}>
                  Send Request
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">Loading mechanics...</p>
          )}
        </div>
      </section>

      {/* ✅ POPUP WHEN REQUEST SENT */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Request Sent!</h3>
            <p>Waiting for <strong>{selectedMechanic?.name}</strong> to respond...</p>
            <p className="countdown">⏳ {formatTime(countdown)} remaining</p>
            <p className="wait-text">Please wait until the provider responds.</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default ACMechanics;
