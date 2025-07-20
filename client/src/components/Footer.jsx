import React from 'react';
import './Footer.css';

// Make sure Font Awesome CDN is included in your public/index.html:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

const footerLinks = [
  {
    heading: 'Spanner.com',
    links: [
      { label: 'About', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Pro', href: '#' },
      { label: 'Jobs', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    heading: 'Shop',
    links: [
      { label: 'Store', href: '#' },
      { label: 'Tools', href: '#' },
      { label: 'Parts', href: '#' },
      { label: 'Deals', href: '#' },
      { label: 'Browse Devices', href: '#' },
    ],
  },
  {
    heading: 'Customer Service',
    links: [
      { label: 'Help', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Order Status', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Accessibility', href: '#' },
      { label: 'Legal Information', href: '#' },
    ],
  },
];

const socialLinks = [
  {
    href: 'https://www.facebook.com/',
    icon: 'fab fa-facebook-f',
    label: 'Facebook',
    handle: '',
  },
  {
    href: 'https://twitter.com/',
    icon: 'fab fa-twitter',
    label: 'Twitter',
    handle: '',
  },
  {
    href: 'https://www.instagram.com/',
    icon: 'fab fa-instagram',
    label: 'Instagram',
    handle: '',
  },
  {
    href: 'https://www.youtube.com/user/',
    icon: 'fab fa-youtube',
    label: 'YouTube',
    handle: '',
  },
];

function Footer() {
  return (
    <footer className="ifixit-footer" role="contentinfo">
      <nav className="footer-main" aria-label="Footer Navigation">
        <div className="footer-container">
          <div className="footer-grid">
            {footerLinks.map((col) => (
              <section className="footer-col" key={col.heading}>
                <h6 className="footer-header">{col.heading}</h6>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </nav>
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <div className="footer-social">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <i className={social.icon} aria-hidden="true"></i>
                <span className="footer-social-handle">{social.handle}</span>
              </a>
            ))}
          </div>
          <div className="footer-legal">
            <span>
              &copy; {new Date().getFullYear()} Spanner.com—{' '}
              <a href="#" >Privacy Policy</a>{' '}
              |{' '}
              <a href="#" >Terms of Use</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;