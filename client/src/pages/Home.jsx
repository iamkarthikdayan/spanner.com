import React, { useEffect, useState } from 'react';
import './Home.css';
import  AC from '../assets/Ac.png'

// Example online images for demonstration (replace with your own if needed)
const cards = [
  {
    title: 'Air-Conditioner Repair',
    img: {AC},
    desc: 'We fix all major air-conditioner brands and models. Fast, affordable, and reliable service.',
  },
  {
    title: ' Repair',
    img: 'https://ucrackwefix.com/wp-content/uploads/2022/09/tablet-repair.png',
    desc: 'Broken tablet? We repair screens, batteries, and more for all major brands.',
  },
  {
    title: 'Computer Repair',
    img: 'https://ucrackwefix.com/wp-content/uploads/2022/09/computer-repair.png',
    desc: 'From hardware to software, our experts can get your computer running like new.',
  },
  {
    title: 'Game Console Repair',
    img: 'https://ucrackwefix.com/wp-content/uploads/2022/09/game-console-repair.png',
    desc: 'We fix PlayStation, Xbox, Nintendo and more. Get back to gaming quickly!',
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

// Titles for each slide (match order of bgImages)
const heroItems = [
  'Washing Machines',
  'Air Conditioners',
  'Refrigerators & More'
];

function Home() {
  const [bgIndex, setBgIndex] = useState(0);

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
          <span style={{ color: '#FFCE00', borderRadius: '0.3em', padding: '0 0.4em' ,fontSize: '3.5rem', fontWeight: '900' }}>
            {heroItems[bgIndex]}
          </span>
          .
        </h1>
         <p className="hero-subtitle">
          Fast, affordable, and professional repair services for your phones, tablets, computers, and more.
        </p>
        
      </section>
      <section className="cards-section">
        <div className="cards-grid">
          {cards.map((card) => (
            <div className="repair-card" key={card.title}>
              <div className="repair-card-img-circle">
                <img src={card.img} alt={card.title} className="repair-card-img" />
              </div>
              <h2 className="repair-card-title">{card.title}</h2>
              <p className="repair-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;