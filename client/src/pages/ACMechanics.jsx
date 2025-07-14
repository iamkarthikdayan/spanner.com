import React, { useEffect, useState } from 'react';
import './AirConditionerRepair.css'; // Reuse your existing styles

function ACMechanics() {
    const [mechanics, setMechanics] = useState([]);

    useEffect(() => {
        // Simulate fetching from backend
        setTimeout(() => {
            setMechanics([
                {
                    name: 'Suresh Kumar',
                    location: 'Kochi Central',
                    rating: 4.8,
                    experience: '8 years',
                    contact: '9876543210'
                },
                {
                    name: 'Anand M.',
                    location: 'Edappally',
                    rating: 4.6,
                    experience: '5 years',
                    contact: '9847032211'
                },
                {
                    name: 'Rehman Ali',
                    location: 'Kakkanad',
                    rating: 4.9,
                    experience: '10 years',
                    contact: '9955533344'
                },
                {
                    name: 'Vineeth V.',
                    location: 'Kaloor',
                    rating: 4.7,
                    experience: '6 years',
                    contact: '8899322233'
                }
            ]);
        }, 1000);
    }, []);

    return (
        <main className="ac-repair-page">
            <section className="ac-faq-section">
                <h2>Top AC Mechanics Near You</h2>
                <div className="mechanics-grid">
                    {mechanics.length > 0 ? (
                        mechanics.map((mech, index) => (
                            <div key={index} className="review-card mechanic-card">
                                <h3 style={{ marginBottom: '0.5rem', color: '#003cff' }}>{mech.name}</h3>
                                <p><strong>Location:</strong> {mech.location}</p>
                                <p><strong>Experience:</strong> {mech.experience}</p>
                                <p><strong>Rating:</strong> {'★'.repeat(Math.floor(mech.rating))}{'☆'.repeat(5 - Math.floor(mech.rating))} ({mech.rating})</p>
                                <p><strong>Contact:</strong> {mech.contact}</p>
                                <button className="send-request-btn">Send Request</button>
                            </div>

                        ))
                    ) : (
                        <p className="no-results">Loading mechanics...</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default ACMechanics;
