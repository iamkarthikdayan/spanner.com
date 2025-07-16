import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AirConditionerRepair.css";

function ACMechanics() {
  const [mechanics, setMechanics] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching from backend
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
        {
          name: "Rehman Ali",
          location: "Kakkanad",
          rating: 4.9,
          experience: "10 years",
          contact: "9955533344",
        },
        {
          name: "Vineeth V.",
          location: "Kaloor",
          rating: 4.7,
          experience: "6 years",
          contact: "8899322233",
        },
      ]);
    }, 1000);
  }, []);

  const handleSendRequest = (mechanic) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      alert("You must log in as a user to send a request!");
      navigate("/login");
      return;
    }

    if (loggedInUser.role !== "user") {
      alert("Providers cannot request services!");
      navigate("/provider-home");
      return;
    }

    // ✅ Save request details in localStorage
    const pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];
    const newRequest = {
      mechanicName: mechanic.name,
      mechanicLocation: mechanic.location,
      requestedBy: loggedInUser.name,
      userEmail: loggedInUser.email,
      userLocation: loggedInUser.location,
      userPhone: loggedInUser.phoneno,
      time: new Date().toISOString()
    };
    localStorage.setItem("pendingRequests", JSON.stringify([...pendingRequests, newRequest]));

    // ✅ Show popup and start timer
    setPopupMessage(
      `Request sent to ${mechanic.name}. Please wait 2 minutes.\nWait until the provider responds.`
    );
    setShowPopup(true);
    setTimer(120); // reset timer
  };

  // Countdown logic
  useEffect(() => {
    let interval;
    if (showPopup && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && showPopup) {
      setPopupMessage("Time’s up! The provider will contact you soon.");
      clearInterval(interval);
      setTimeout(() => setShowPopup(false), 3000);
    }
    return () => clearInterval(interval);
  }, [showPopup, timer]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <main className="ac-repair-page">
      <section className="ac-faq-section">
        <h2>Top AC Mechanics Near You</h2>
        <div className="mechanics-grid">
          {mechanics.length > 0 ? (
            mechanics.map((mech, index) => (
              <div key={index} className="review-card mechanic-card">
                <h3 style={{ marginBottom: "0.5rem", color: "#003cff" }}>
                  {mech.name}
                </h3>
                <p><strong>Location:</strong> {mech.location}</p>
                <p><strong>Experience:</strong> {mech.experience}</p>
                <p>
                  <strong>Rating:</strong>{" "}
                  {"★".repeat(Math.floor(mech.rating))}
                  {"☆".repeat(5 - Math.floor(mech.rating))} ({mech.rating})
                </p>
                <p><strong>Contact:</strong> {mech.contact}</p>
                <button
                  className="send-request-btn"
                  onClick={() => handleSendRequest(mech)}
                >
                  Send Request
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">Loading mechanics...</p>
          )}
        </div>
      </section>

      {/* ✅ POPUP MODAL */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>{popupMessage}</h3>
            {timer > 0 && (
              <p>⏳ Waiting time: <strong>{formatTime(timer)}</strong></p>
            )}
            {timer > 0 && (
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default ACMechanics;
