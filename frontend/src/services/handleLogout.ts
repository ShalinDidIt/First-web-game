const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost/memory-game-backend/api/logout.php', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging out:', error);
        return { success: false, message: 'Unable to connect to the server.' };
    }
};

export default handleLogout;