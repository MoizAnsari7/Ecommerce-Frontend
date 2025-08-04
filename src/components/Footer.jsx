import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h3>ClassicShop</h3>
          <p>Your go-to destination for quality and value.</p>
        </div>

        <div className="footer-section">
          <h4>Why Choose Us?</h4>
          <ul>
            <li>✅ Premium Quality Products</li>
            <li>🚚 Fast & Free Shipping</li>
            <li>🔁 Hassle-Free Returns (7 Days)</li>
            <li>🔒 Secure Payment Options</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:support@classicshop.com">support@classicshop.com</a></p>
          <p>Phone: <a href="tel:+917440786288">+91 74407 86288</a></p>
        </div>

      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} ClassicShop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;