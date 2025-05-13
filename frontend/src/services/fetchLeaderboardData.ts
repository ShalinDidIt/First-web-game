const fetchLeaderboardData = async (difficulty) => {
    try {
        const response = await fetch(`http://localhost:5173/memory-game/backend/api/leaderboards.php?difficulty=${difficulty}`);
        const data = await response.json();
        // setLeaderboardData(data);
        console.log('Leaderboard data:', data);
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
    }
};

export default fetchLeaderboardData;