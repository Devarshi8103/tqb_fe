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
       <a href="https://www.google.com/maps/place/The+Queen+Baker,+Lali+Faliya,+Shop+no+G3,+ShivShakti+Complex,+Bhatha,+near+Damla+faliya+cricket+ground,+Bilimora,+Gujarat+396310/@20.7888755,72.954168,17z/data=!4m6!3m5!1s0x3be0ef7c9dce6edd:0xc0b93b979296a271!8m2!3d20.7885441!4d72.9539316!16s%2Fg%2F11tjc4vjhf"
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
