const saveScore = async (timeScore, mistakesMade, difficulty) => {
    try {
        const response = await fetch('http://localhost/memory-game-backend/api/save_score.php', {
            method: 'POST',
            credentials: 'include', // Include cookies for session-based authentication
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ time_score: timeScore, mistakes_made: mistakesMade, difficulty: difficulty }),
        })
        const data = await response.json()
        if (data.success) {
            console.log('Score saved successfully')
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Error saving score:', error)
    }
}

export default saveScore