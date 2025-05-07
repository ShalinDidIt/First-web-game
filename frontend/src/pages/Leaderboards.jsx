import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Leaderboards.css'; 

const Leaderboards = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [difficulty, setDifficulty] = useState(1); // Default difficulty level

    useEffect(() => {
        // Simulate fetching data from the backend
        // const fetchLeaderboardData = async () => {
        //     try {
        //         // Replace this with your backend API call
        //         const response = await fetch(`/api/leaderboards?difficulty=${difficulty}`);
        //         const data = await response.json();
        //         setLeaderboardData(data);
        //     } catch (error) {
        //         console.error('Error fetching leaderboard data:', error);
        //     }
        // };
        
        const fetchLeaderboardData = async () => {
            // Simulated data for testing
            const mockData = [
                { username: 'johndoe', time_score: 12.5, mistakes_made: 1 },
                { username: 'janedoe', time_score: 15.2, mistakes_made: 2 },
                { username: 'jakedoe', time_score: 18.1, mistakes_made: 3 },
            ];
            setLeaderboardData(mockData);
        };
        fetchLeaderboardData();
    }, [difficulty]);

    return (
        <div className="leaderboards">
            <h1>Leaderboards</h1>
            <div className="difficulty-selector">
                <button onClick={() => setDifficulty(1)}>Easy</button>
                <button onClick={() => setDifficulty(2)}>Medium</button>
                <button onClick={() => setDifficulty(3)}>Hard</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Time (s)</th>
                        <th>Mistakes</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.length > 0 ? (
                        leaderboardData.map((entry, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.username}</td>
                                <td>{entry.time_score}</td>
                                <td>{entry.mistakes_made}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default Leaderboards;