import React from 'react';
import authStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const { signupForm, updateSignupForm, signup } = authStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup();
    navigate('/');
  };

  return (
    <>
      <form className="signup-form" onSubmit={handleSignup}>
      <h2>Sign Up</h2>
        <input
          className="signup-input"
          onChange={updateSignupForm}
          value={signupForm.email}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="signup-input"
          onChange={updateSignupForm}
          value={signupForm.password}
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
};

export default SignupForm;
