import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import './register.css';

const Register = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/register', {
                username: input.username,
                email: input.email,
                password: input.password
            });
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="cf-container">
            <div className="cf-register-form">
                <h2 className="cf-title">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="cf-form-group">
                        <label className="cf-label" htmlFor="username">Username:</label>
                        <input
                            name="username"
                            value={input.username}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            type="text"
                            id="username"
                            className="cf-input"
                        />
                    </div>
                    <div className="cf-form-group">
                        <label className="cf-label" htmlFor="email">Email:</label>
                        <input
                            name="email"
                            value={input.email}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            type="email"
                            id="email"
                            className="cf-input"
                        />
                    </div>
                    <div className="cf-form-group">
                        <label className="cf-label" htmlFor="password">Password:</label>
                        <input
                            name="password"
                            value={input.password}
                            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                            type="password"
                            id="password"
                            className="cf-input"
                        />
                    </div>
                    <button className="cf-btn" type="submit">Register</button>
                </form>
                <div className="cf-link">
                    <a href="/login">Already have an account? Login here</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
