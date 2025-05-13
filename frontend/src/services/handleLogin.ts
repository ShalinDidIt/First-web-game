const handleLogin = async (username, password) => {
    try {
        const response = await fetch('http://localhost/memory-game-backend/api/login.php', {
            method: 'POST',
            credentials: 'include', // Include cookies for session-based authentication
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
            console.log("A")
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: 'Unable to connect to the server.' };
    }
};

export default handleLogin;