import React, { useState } from 'react';
import '../css/Login.css'; // Import your CSS file
import GoogleButton from '../components/GoogleButton'
// import FacebookButton from '../components/FacebookButton';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink as Navlink } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleBtn = () => {
    setShowPassword(prevState => !prevState);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          {/* Replace with your logo */}
          <span className="logo-text">Chat Application</span>
        </div>
        <h2>Welcome back to Chat 06! 🎉</h2>
        <p>Please sign-in to your account and start the adventure</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
          <sub>email</sub>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group input-group-password">
          <sub>password</sub>             
          <a href="/forgot-password">Forgot Password?</a>
          <span>
            <input
              type={showPassword ? "text" : "password"} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={toggleBtn} type='btn' formNoValidate>
              {/* <AiOutlineEyeInvisible /> */}
              {showPassword? <AiOutlineEyeInvisible /> :  <AiOutlineEye />}
            </button></span>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
          </div>
          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
        <div className="create-account">
        Don't have an account? <Navlink to={'/signup'} className='navlink'>Sign Up</Navlink>
        </div>
        <div className="social-login">
        <div className="divider">
          <span>or</span>
        </div>
          <div className="social-buttons">
            <GoogleButton/>
            <FacebookButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;