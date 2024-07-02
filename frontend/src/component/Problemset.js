import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './problemset.css';

const Problemset = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [solvedProblems, setSolvedProblems] = useState(() => {
        const saved = localStorage.getItem('solvedProblems');
        return saved ? JSON.parse(saved) : [];
    });

    const [submissions, setSubmissions] = useState(() => {
        const saved = localStorage.getItem('submissions');
        return saved ? JSON.parse(saved) : {};
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [searchRating, setSearchRating] = useState('');
    const [searchTag, setSearchTag] = useState('');

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await fetch('https://codeforces.com/api/problemset.problems');
                const data = await response.json();
                const problems = data.result.problems.map(problem => ({
                    name: `${problem.contestId}.${problem.index} ${problem.name}`,
                    rating: problem.rating || 'Unrated',
                    id: `${problem.contestId}/${problem.index}`,
                    tags: problem.tags
                }));
                setProblems(problems);
            } catch (error) {
                console.error('Error fetching problems:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    useEffect(() => {
        localStorage.setItem('solvedProblems', JSON.stringify(solvedProblems));
        localStorage.setItem('submissions', JSON.stringify(submissions));
        localStorage.setItem('solvedCount', solvedProblems.length);
    }, [solvedProblems, submissions]);

    const toggleSolved = (problemId) => {
        setSolvedProblems(prevSolved => {
            if (prevSolved.includes(problemId)) {
                // Remove from submissions
                setSubmissions(prevSubmissions => {
                    const { [problemId]: removedCode, ...restSubmissions } = prevSubmissions;
                    return restSubmissions;
                });
                return prevSolved.filter(id => id !== problemId);
            } else {
                const submittedCode = prompt('Please enter your submitted code:');
                if (submittedCode) {
                    setSubmissions(prevSubmissions => ({
                        ...prevSubmissions,
                        [problemId]: submittedCode
                    }));
                    return [...prevSolved, problemId];
                } else {
                    return prevSolved;
                }
            }
        });
    };

    const filteredProblems = problems.filter(problem => {
        const matchesSearchTerm = problem.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = searchRating === '' || (problem.rating !== 'Unrated' && problem.rating === parseInt(searchRating));
        const matchesTag = searchTag === '' || problem.tags.includes(searchTag);
        
        return matchesSearchTerm && matchesRating && matchesTag;
    });

    if (loading) {
        return <div className="loading">Loading problems...</div>;
    }

    return (
        <div className="problemset-container">
            <Navbar />
            <h1 id='head'>ZCODER Problemset</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search by problem name..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input 
                    list="ratings" 
                    placeholder="Search by rating..." 
                    value={searchRating} 
                    onChange={(e) => setSearchRating(e.target.value)}
                />
                <datalist id="ratings">
                    {Array.from({ length: (3500 - 800) / 100 + 1 }, (_, i) => 800 + i * 100).map(rating => (
                        <option key={rating} value={rating}>{rating}</option>
                    ))}
                </datalist>
                <input 
                    type="text" 
                    placeholder="Search by tag..." 
                    value={searchTag} 
                    onChange={(e) => setSearchTag(e.target.value)}
                />
            </div>
            <div className="problems-list">
                {filteredProblems.map((problem, index) => (
                    <div className={`problem-card ${solvedProblems.includes(problem.id) ? 'solved' : ''}`} key={index}>
                        <input 
                            type="checkbox" 
                            checked={solvedProblems.includes(problem.id)} 
                            onChange={() => toggleSolved(problem.id)}
                        />
                        <h3>{problem.name}</h3>
                        <p className="rating">Rating: {problem.rating}</p>
                        <div className="tags">
                            {problem.tags.map((tag, idx) => (
                                <span className="tag" key={idx}>{tag}</span>
                            ))}
                        </div>
                        <a href={`https://codeforces.com/contest/${problem.id.split('/')[0]}/problem/${problem.id.split('/')[1]}`} target="_blank" rel="noopener noreferrer">View Problem</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Problemset;
