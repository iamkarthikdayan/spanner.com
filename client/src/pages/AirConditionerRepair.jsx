
import React, { useEffect, useState } from 'react';
import './AirConditionerRepair.css';
import AC from '../assets/AC1.png'; // Same AC image from your assets
import ACBG from '../assets/ACbg.jpg'; // Background image for the hero section
import { useNavigate } from 'react-router-dom';




const bgImages = [
    ACBG,
    'https://5.imimg.com/data5/SELLER/Default/2023/3/297442943/KV/TV/AK/196225756/split-ac-installation-service-500x500.jpeg',
    'https://img.freepik.com/premium-photo/air-conditioner-maintenance-cleaning-technician-he-man-cleaning-air-conditioner-home_293060-140.jpg'
];

function AirConditionerRepair() {
    const navigate = useNavigate();
    const [bgIndex, setBgIndex] = useState(0);
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % bgImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        // Simulate fetching from DB
        setReviews([
            { name: 'Anjali Menon', rating: 5, text: 'Quick and professional service!' },
            { name: 'Rahul Varma', rating: 4, text: 'Technician was polite and fixed it well.' },
            { name: 'Divya S.', rating: 5, text: 'Very reliable and affordable pricing.' },
        ]);
    }, []);
    return (
        <main className="ac-repair-page">
            <section className="ac-hero-section">
                <div className="ac-hero-slideshow">
                    {bgImages.map((img, idx) => (
                        <div
                            key={idx}
                            className={`ac-bg-slide ${idx === bgIndex ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                </div>
                <div className="ac-hero-content">
                    <h1>Air Conditioner Repair in Kochi</h1>
                    <p>Fast, reliable, and professional AC service at your doorstep. We service all major brands and models.</p>
                    <button className="ac-cta-btn" onClick={() => navigate('/ac-mechanics')}>
                        Book a Service
                    </button>

                </div>
            </section>

            <section className="ac-service-info">
                <div className="ac-service-img">
                    <img src={AC} alt="AC Repair" />
                </div>
                <div className="ac-service-details">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>✔ On-demand service at your convenience</li>
                        <li>✔ Experienced and verified technicians</li>
                        <li>✔ Transparent pricing – no hidden charges</li>
                        <li>✔ 30-day service guarantee</li>
                    </ul>
                </div>
            </section>

            <section className="ac-faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    <div className="faq-item">
                        <h3>What types of ACs do you service?</h3>
                        <p>We service window ACs, split ACs, and cassette ACs of all brands.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Do you provide gas filling and installation?</h3>
                        <p>Yes, we provide gas refilling, installation, uninstallation, and regular maintenance.</p>
                    </div>
                    <div className="faq-item">
                        <h3>Is there a warranty on repairs?</h3>
                        <p>Yes, we offer a 30-day warranty on repairs done by our team.</p>
                    </div>
                </div>
            </section>

            <section className="wm-reviews-section">
                <h2>Customer Reviews</h2>
                <div className="review-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <div className="review-text">"{review.text}"</div>
                            <div className="review-stars">
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                            </div>
                            <div className="review-author">– {review.name}</div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default AirConditionerRepair;
