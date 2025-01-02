import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !phonenumber || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    const phoneRegex = /^\+94[0-9]{9}$/;
    if (!phoneRegex.test(phonenumber)) {
      setErrorMessage('Please enter a valid phone number starting with +94');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    setErrorMessage('');

    try {
      await axios.post('http://localhost:3001/api/auth/register', { firstname, lastname, email, phonenumber, password });
      navigate('/login');
    } catch (err) {
      console.error(err);
      setErrorMessage('Registration failed, please try again');
    }
  };

  return (
    <>
      <div class="reg-container ">
        <div class="regiCard">
          <div class="text-center mb-4">
            <h2 class="logoText">ReadiFy</h2>
          </div>
          <h3 class="text-center mb-4">Register</h3>
          <form onSubmit={handleRegister}>
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label for="firstname" class="form-label">First Name</label>
                  <input
                    class="form-control"
                    type="text"
                    id="firstname"
                    value={firstname}
                    placeholder="Samitha"
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="lastname" class="form-label">Last Name</label>
                  <input
                    class="form-control"
                    type="text"
                    id="lastname"
                    value={lastname}
                    placeholder="Senevirathne"
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    class="form-control"
                    type="email"
                    id="email"
                    value={email}
                    placeholder="@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="phonenumber" class="form-label">Phone Number</label>
                  <input
                    class="form-control"
                    type="text"
                    id="phonenumber"
                    value={phonenumber}
                    placeholder="+94771234567"
                    onChange={(e) => setPhonenumber(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    value={password}
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="********"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div class="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <div class="d-grid">
              <button type="submit" class="sign-btn  btn-block">SIGN UP</button>
            </div>
          </form>
          <div class="text-center mt-4">
            <p>Already have an account? <a href="/login">Log in</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
