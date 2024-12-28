import React from "react";
import "../css/GoogleButton.css";
import GoogleLogo from "../assets/GoogleLogo.png";
import { useAuth } from "../context/AuthContext.jsx"; // Import useAuth hook

const GoogleButton = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <button className="google-button" onClick={signInWithGoogle}>
      <img
        src={GoogleLogo}
        alt="Google Logo"
        className="google-logo"
      />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
