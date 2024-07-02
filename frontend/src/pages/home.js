import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../component/Navbar.js";
import './home.css';

const Home = () => {
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem('user'));
    const [solvedCount, setSolvedCount] = useState(0);

    useEffect(() => {
        const savedCount = localStorage.getItem('solvedCount');
        if (savedCount) {
            setSolvedCount(parseInt(savedCount, 10));
        }
    }, []);

    return (
        <div className="home-container">
            <Navbar />
            <header className="welcome-section">
                <h2>Welcome {userName ? userName.name : 'Coder'}!</h2>
                <p>Ready to improve your coding skills?</p>
            </header>
            
            <section className="user-profile">
                <h3>Your Profile</h3>
                <div className="profile-details">
                    <p><strong>Name:</strong> {userName ? userName.name : 'Coder'}</p>
                    <p><strong>Problems Solved:</strong> {solvedCount}</p>
                    <p><strong>Rating:</strong> 1200</p>
                </div>
            </section>
            
            <footer className="home-footer">
                <p>© 2024 ZCODER. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
