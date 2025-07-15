import React, { useEffect, useState } from 'react';
import './WashingMachineRepair.css';
import WM from '../assets/Washing Machine.png';

function WashingMachineRepair() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulate fetching from DB
    setReviews([
      { name: 'Anjali Menon', rating: 5, text: 'Quick and professional service!' },
      { name: 'Rahul Varma', rating: 4, text: 'Technician was polite and fixed it well.' },
      { name: 'Divya S.', rating: 5, text: 'Very reliable and affordable pricing.' },
    ]);
  }, []);

  return (
    <main className="wm-repair-page">
      <section className="wm-hero-section">
        <div className="wm-hero-content">
          <h1>Washing Machine Repair in Kochi</h1>
          <p>Doorstep washing machine repair services for all brands and models. Fast, affordable, and trusted by thousands.</p>
          <button className="wm-cta-btn">Book a Service</button>
        </div>
      </section>

      <section className="wm-service-info">
        <div className="wm-service-img">
          <img src={WM} alt="Washing Machine Repair" />
        </div>
        <div className="wm-service-details">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔ Same-day doorstep service</li>
            <li>✔ Trained professionals for top and front load models</li>
            <li>✔ Transparent rates with no hidden costs</li>
            <li>✔ 30-day service warranty</li>
          </ul>
        </div>
      </section>

      <section className="wm-faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>What types of washing machines do you repair?</h3>
            <p>We repair all models including top-load, front-load, semi-automatic, and fully automatic machines.</p>
          </div>
          <div className="faq-item">
            <h3>Do you replace spare parts?</h3>
            <p>Yes, we use genuine spare parts and provide warranty on the replacements.</p>
          </div>
          <div className="faq-item">
            <h3>How quickly can I get a technician?</h3>
            <p>Usually within the same day, based on availability in your area.</p>
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

export default WashingMachineRepair;
