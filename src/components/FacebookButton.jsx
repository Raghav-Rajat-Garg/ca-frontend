import React from "react";
import "../css/FacebookButton.css";
import FacebookLogo from "../assets/FacebookLogo.png";
import { useAuth } from "../context/AuthContext.jsx"; // Import useAuth hook

const FacebookButton = () => {
  const { signInWithFacebook } = useAuth();
  console.log(useAuth().user)
  const newUser = useAuth().user

  return (
    <button className="facebook-button" onClick={signInWithFacebook}>
      <img
        src={FacebookLogo}
        alt="Facebook Logo"
        className="facebook-logo"
      />
      Continue with Facebook
    </button>
  );
};

export default FacebookButton;
