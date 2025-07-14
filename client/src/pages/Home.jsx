import React, { useEffect, useState } from 'react';
import './Home.css';
import AC from '../assets/AC1.png';
import WM from '../assets/Washing Machine.png';
import REF from '../assets/Refrigerator.png';
import FAN from '../assets/fan.png';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'Air-Conditioner Repair',
    img: AC,
    desc: 'We fix all major air-conditioner brands and models. Fast, affordable, and reliable service.',
  },
  {
    title: 'Washing Machine Repair',
    img: WM,
    desc: 'We repair all major washing machine brands and models. Fast, affordable, and reliable service.',
  },
  {
    title: 'Refrigerator Repair',
    img: REF,
    desc: 'We repair all major refrigerator brands and models. Fast, affordable, and reliable service.',
  },
  {
    title: 'Fan Repair',
    img: FAN,
    desc: 'We fix all major fan brands and models. Fast, affordable, and reliable service.',
  },
  {
    title: 'Other Devices',
    img: 'https://ucrackwefix.com/wp-content/uploads/2022/09/other-devices.png',
    desc: 'Smartwatches, headphones, and more. If it’s broken, we can help!',
  },
];

const bgImages = [
  'https://www.bing.com/th?id=OIP.wkbaYeou17ykHAztLrB4bAHaE8',
  'https://thumbs.dreamstime.com/z/mechanic-technician-repairing-air-conditioner-room-143592434.jpg',
  'https://wilshirerefrigeration.com/wp-content/uploads/2020/07/Male-Technician-With-Screwdriver-Repairing-Refrigerator-in-Kitchen.jpg'
];

const heroItems = [
  'Washing Machines',
  'Air Conditioners',
  'Refrigerators & More'
];

function Home() {
  const [bgIndex, setBgIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home-main">
      <section className="hero-section">
        <div className="hero-bg-slideshow" aria-hidden="true">
          {bgImages.map((img, idx) => (
            <div
              key={img}
              className={`hero-bg-slide${idx === bgIndex ? ' active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>

        <h1 className="hero-title">
          We Fix Your <br />
          <span style={{ color: '#FFCE00', borderRadius: '0.3em', padding: '0 0.4em', fontSize: '3.5rem', fontWeight: '900' }}>
            {heroItems[bgIndex]}
          </span>
          .
        </h1>
        <p className="hero-subtitle">
          Fast, affordable, and professional repair services for your phones, tablets, computers, and more.
        </p>
      </section>

      {/* --- Our Services Section --- */}
      <section className="cards-section" id="repair-services">
        <h2 className="services-heading">Our Services</h2>

        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="service-search-input"
          />
        </div>

        <div className="cards-grid">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div className="repair-card" key={card.title}>
                <div className="repair-card-img-circle">
                  <img src={card.img} alt={card.title} className="repair-card-img" />
                </div>
                <h2 className="repair-card-title">{card.title}</h2>
                <p className="repair-card-desc">{card.desc}</p>
                <button
                  className="know-more-btn"
                  onClick={() => {
                    if (card.title === 'Air-Conditioner Repair') {
                      navigate('/ac-repair');
                    } else if (card.title === 'Washing Machine Repair') {
                      navigate('/wm-repair');
                    } else {
                      alert(`More information about ${card.title} coming soon!`);
                    }
                  }}
                >
                  Know More
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No services found.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
