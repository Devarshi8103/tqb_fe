// SignInPage.js
import React, { useState } from 'react';
import './SignInPage.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    if (email === process.env.REACT_APP_EMAIL && password === process.env.REACT_APP_PASSWORD) {
      localStorage.setItem("token", "true");
      navigate("/admin/home");
    } else {
      alert("Please enter correct credentials");
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form className="sign-in-form" onSubmit={handleSignIn}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
