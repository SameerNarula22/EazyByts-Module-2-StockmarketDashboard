import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './LoginSignUp.css';
import logo from '../Authorization/logoM.png';

const LoginSignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });

  const [formType, setFormType] = useState('signUp');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'signUp') {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        if (formData.age < 18) {
          alert('You must be 18 years or older to sign up.');
          return;
        }
        
        const response = await axios.post('http://localhost:5000/signup', formData);
        alert(response.data.message);
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          age: ''
        });
      } else {
        const response = await axios.post('http://localhost:5000/login', formData);
        alert(response.data.message);
        localStorage.setItem('username', formData.username);
        navigate('/Home');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  const toggleForm = () => {
    setFormType(formType === 'signUp' ? 'login' : 'signUp');
  };

  return (
    <div>
      <div className="background"></div>
      <div className="Container">
        <div className="logo-container">
          <img src={logo} alt="App Logo" />
        </div>
        <div className="form-container">
          <h1>{formType === 'signUp' ? 'Sign Up' : 'Login'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            {formType === 'signUp' && (
              <>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input 
                    type="number" 
                    id="age" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </>
            )}
            <div className="button-container">
              <button type="submit">{formType === 'signUp' ? 'Sign Up' : 'Login'}</button>
              <button className="login" type="button" onClick={toggleForm}>
                {formType === 'signUp' ? 'Login' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
