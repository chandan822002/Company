import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    //axios.post('http://localhost:3001/login', {
      axios.post('https://gleeful-biscotti-c80e99.netlify.app/login', {
      email,
      password,
    })
      .then(res => {
        console.log(res);
        setMessage('Login Successful!');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);  
        } else {
          setMessage('Login failed. Invalid credentials.');
        }
      });
  };

  return (
    <div className='align-items-center bg-secondary vh-100'>
      <div className='row justify-content-center align-items-center vh-100'>
        <div className='col-12 col-sm-8 col-md-6 col-lg-3 bg-white p-4 rounded'>
          <h2 className='text-center mb-3'>Login</h2>

          {message && (
            <div className={`alert ${message.includes('Successful') ? 'alert-success' : 'alert-danger'} text-center`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email</strong></label>
              <input type="email" id="email" name='email' className='form-control rounded-0'
                placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className='mb-3'>
              <label htmlFor="password"><strong>Password</strong></label>
              <input type="password" id="password" name='password' className='form-control rounded-0'
                placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type='submit' className='btn btn-primary w-100 rounded-0 mb-2'>Login</button>
          </form>

          <p className='text-start'>Don't have an account? <Link to="/register" className='text-decoration-none ms-1'>Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
