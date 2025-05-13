const handleSignup = async (username, password) => {
    try {
        const response = await fetch('http://localhost/memory-game-backend/api/signup.php', {
            method: 'POST',
            credentials: 'include', // Include cookies for session-based authentication
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log("handleSignup: ", data)
        return data;
    } catch (error) {
        console.error('Error signing up:', error);
        return { success: false, message: 'Unable to connect to the server.' };
    }
};

export default handleSignup;