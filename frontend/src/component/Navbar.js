import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../assets/zcoder-logo.png'; // Make sure to place the logo image in this path

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={logo} alt="ZCoder Logo" className="logo" />
                <h1>ZCoder</h1>
            </div>
            <main>
                <Link to={"/"}>Home</Link>
                <Link to={"/problemset"}>Problemset</Link>
                <Link to={"/submitted"}>Submitted</Link>
                <Link to={"/login"}>Login</Link>
            </main>
            <button onClick={() => {
                localStorage.removeItem('loggedin');
                window.location.href = '/login';
            }} className="logout-button">Logout</button>
        </nav>
    );
};

export default Navbar;
