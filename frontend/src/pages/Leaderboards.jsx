import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Leaderboards.css'

const Leaderboards = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [difficulty, setDifficulty] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await fetch(
                    `http://localhost/memory-game-backend/api/leaderboards.php?difficulty=${difficulty}`
                );
                const data = await response.json();
                const sortedData = data.sort((a, b) => a.rank - b.rank); // Default sorting by rank
                setLeaderboardData(sortedData);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };
        fetchLeaderboardData();
    }, [difficulty]);

    const sortLeaderboard = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...leaderboardData].sort((a, b) => {
            if (key === 'rank') {
                return direction === 'asc' ? a.rank - b.rank : b.rank - a.rank;
            } else if (key === 'username') {
                return direction === 'asc'
                    ? a.username.localeCompare(b.username)
                    : b.username.localeCompare(a.username);
            } else if (key === 'time_score') {
                return direction === 'asc' ? a.time_score - b.time_score : b.time_score - a.time_score;
            } else if (key === 'mistakes_made') {
                return direction === 'asc' ? a.mistakes_made - b.mistakes_made : b.mistakes_made - a.mistakes_made;
            }
            return 0;
        });

        setLeaderboardData(sortedData);
    };

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
                        <th>
                            Rank
                            <a
                                className={`arrow ${sortConfig.key === 'rank' && sortConfig.direction === 'asc' ? 'active' : ''}`}
                                onClick={() => sortLeaderboard('rank')}
                            >
                                ▲
                            </a>
                            <a
                                className={`arrow ${sortConfig.key === 'rank' && sortConfig.direction === 'desc' ? 'active' : ''}`}
                                onClick={() => sortLeaderboard('rank')}
                            >
                                ▼
                            </a>
                        </th>
                        <th>
                            Username
                            <a
                                className={`arrow ${sortConfig.key === 'username' && sortConfig.direction === 'asc' ? 'active' : ''}`}
                                onClick={() => sortLeaderboard('username')}
                            >
                                ▲
                            </a>
                            <a
                                className={`arrow ${sortConfig.key === 'username' && sortConfig.direction === 'desc' ? 'active' : ''}`}
                                onClick={() => sortLeaderboard('username')}
                            >
                                ▼
                            </a>
                        </th>
                        <th>
                            Time (s)
                            <a
                                className={`arrow ${sortConfig.key === 'time_score' && sortConfig.direction === 'asc' ? 'active' : ''}`}
                                onClick={() => sortLeaderboard('time_score')}
                            >
                                ▲
                            </a>
                            <a
                                className={`arrow ${sortConfig.key === 'time_score' && sortConfig.direction === 'desc' ? 'active' : ''}`}
                                onClick={() => sortLeaderboard('time_score')}
                            >
                                ▼
                            </a>
                        </th>
                        <th>
                            Mistakes
                            <a
                                className={`arrow ${sortConfig.key === 'mistakes_made' && sortConfig.direction === 'asc' ? 'active' : ''}`}
                                onClick={() => sortLeaderboard('mistakes_made')}
                            >
                                ▲
                            </a>
                            <a
                                className={`arrow ${sortConfig.key === 'mistakes_made' && sortConfig.direction === 'desc' ? 'active' : ''}`}
                                onClick={() => sortLeaderboard('mistakes_made')}
                            >
                                ▼
                            </a>
                        </th>
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