import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './submitted.css';

const Submitted = () => {
    const [submissions, setSubmissions] = useState(() => {
        const saved = localStorage.getItem('submissions');
        return saved ? JSON.parse(saved) : {};
    });

    return (
        <div className="submitted-container">
            <Navbar />
            <h1 id="head">Submitted Problems</h1>
            <div className="problems-list">
                {Object.keys(submissions).length > 0 ? (
                    Object.keys(submissions).map((problemId, index) => (
                        <div className="problem-card" key={index}>
                            <h3>{problemId}</h3>
                            <pre>{submissions[problemId]}</pre>
                        </div>
                    ))
                ) : (
                    <p>No submissions done.</p>
                )}
            </div>
        </div>
    );
};

export default Submitted;
