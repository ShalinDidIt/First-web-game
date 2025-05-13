import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Leaderboards.css' 

const Leaderboards = () => {
    const [leaderboardData, setLeaderboardData] = useState([])
    const [difficulty, setDifficulty] = useState(1) 

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await fetch(
                    `http://localhost/memory-game-backend/api/leaderboards.php?difficulty=${difficulty}`
                )
                const data = await response.json()
                setLeaderboardData(data)
            } catch (error) {
                console.error('Error fetching leaderboard data:', error)
            }
        }
        fetchLeaderboardData()
    }, [difficulty])

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
    )
}

export default Leaderboards