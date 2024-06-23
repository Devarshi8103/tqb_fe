import React , { useState} from 'react';
import './SignInPage.css'; // Import CSS file for styling
import AdminHome from './AdminComponents/AdminHome';
import { useNavigate } from 'react-router-dom'; // Import useNavigate




const SignInPage = () => {
  const navigate = useNavigate(); 

  const [token , setToken ] = useState(false);


  const [email , setEmail]  = useState("");
  const [password , setPassword]  = useState("");


 

  const handleSignIn = (e) => {
    e.preventDefault();

    if(email === process.env.REACT_APP_EMAIL && password === process.env.REACT_APP_PASSWORD)
   {
      setToken(true);

     navigate("/admin/home");

   }

    else{
      alert("please enter correct credential")
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form className="sign-in-form" onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password"onChange={(e)=>{setPassword(e.target.value)}} />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
