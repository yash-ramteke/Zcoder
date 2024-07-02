import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import './login.css';

const server = 'http://localhost:3000';

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${server}/api/users/login`, {
                email: input.email,
                password: input.password
            });
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            alert('Wrong email or password');
        }
    };

    return (
        <div className="cf-container">
            <div className="cf-login-form">
                <h2 className="cf-title">Enter</h2>
                <form onSubmit={handleLogin}>
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
                    <button className="cf-btn" type="submit">Login</button>
                </form>
                <div className="cf-link">
                    <a href="/register">Don't have an account? Register here</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
