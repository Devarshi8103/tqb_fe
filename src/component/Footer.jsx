import React from 'react';
import { FaWhatsapp, FaInstagram, FaPhone, FaGoogle } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h3 className='footer-headers contact'>Contact Us</h3>
          <p><FaPhone /> +91 96018 35603</p>
        </div>
        <div className='follow-header'>
        <h3 className='footer-headers'>Follow Us</h3>
        <div className="social-media">
          <a href="https://wa.me/+919601835603?text=Hi" target="_blank" rel="noopener noreferrer">
            <p className='whatsapp' ><FaWhatsapp className='social-media-icons whatsapp' />WhatsApp</p>
          </a>
          <a href="https://www.instagram.com/thequeenbaker_" target='_blank' rel="noopener noreferrer">
            <p  className='instagram'>  <FaInstagram  className='social-media-icons instagram'>  </FaInstagram> Instagram</p>
          </a>
        
          <a href="https://photos.app.goo.gl/SNagYWGy6Qgabvyt6" target="_blank" rel="noopener noreferrer">
            <p className='google-photos' ><FaGoogle   className='social-media-icons google-photos'  /> Google Photos </p>
          </a>
        </div>
        </div>
        <div>

        <h3 className='footer-headers'>Review</h3>
        <p>
       <a href="https://search.google.com/local/writereview?placeid=ChIJ3W7OnXzv4DsRcaKWkpc7ucA"
       target='_blank'>   <img
            className="review"
            src="https://res.cloudinary.com/dmcxyn0eu/image/upload/v1695316698/Static%20Images/google_review_v1.0.png"
            alt="review image"
          />
          </a>
        </p>
        </div>

        
      </div>
      <div className="slogan">
          <h2>#WeBakeHappiness</h2>
        </div>
      <div className="footer-bottom">
        <p>&copy; 2024 The Queen Baker . All rights reserved.</p>
      </div>
    </footer>
  );
}
