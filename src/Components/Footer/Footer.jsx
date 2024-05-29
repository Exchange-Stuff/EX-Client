import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>ABOUT US</h3>
          <ul>
            <li>Mission & Vision</li>
            <li>Our Company</li>
            <li>Our Projects</li>
            <li>Our Team</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>DISCOVER</h3>
          <ul>
            <li>Projects & Research</li>
            <li>Clients Review</li>
            <li>Our Projects</li>
            <li>Our Team</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>USEFUL LINKS</h3>
          <ul>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>Review</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>SPEAK</h3>
          <p>Seize Potential, Enhance & Acquire Knowledge</p>
          <form>
            <label htmlFor="email">Subscribe to get our Newsletter</label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2021 Class Technologies Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
