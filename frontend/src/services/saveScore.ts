const saveScore = async (userId, difficulty, timeScore, mistakesMade) => {
    try {
        const response = await fetch('http://localhost/save_score.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, difficulty, time_score: timeScore, mistakes_made: mistakesMade }),
        });
        const data = await response.json();
        if (data.success) {
            alert('Score saved successfully');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error saving score:', error);
    }
};

export default saveScore;