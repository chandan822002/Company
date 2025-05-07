import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', {
       // axios.post('https://gleeful-biscotti-c80e99.netlify.app/register',{
            name,
            country,
            email,
            password,
        })
            .then(result => {
                console.log(result);
                setMessage('Registered Successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                setMessage('Registration failed. Please try again.');
            });
    };

    return (
        <div className='align-items-center bg-secondary vh-100'>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className='col-12 col-sm-8 col-md-6 col-lg-3 bg-white p-4 rounded'>
                    <h2 className='text-center mb-3'>Register</h2>

                    {message && (
                        <div className={`alert ${message.includes('Successfully') ? 'alert-success' : 'alert-danger'} text-center`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input type="text" id="name" name='name' className='form-control rounded-0' placeholder='Enter Name'
                                onChange={(e) => setName(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="country"><strong>Country</strong></label>
                            <input type="text" id="country" name='country' className='form-control rounded-0' placeholder='Enter Country'
                                onChange={(e) => setCountry(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" id="email" name='email' className='form-control rounded-0' placeholder='Enter Email'
                                onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" id="password" name='password' className='form-control rounded-0' placeholder='Enter Password'
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Register</button>
                    </form>

                    <p className='text-start'>Already Have an Account? <Link to="/login" className='text-decoration-none ms-1'>Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
