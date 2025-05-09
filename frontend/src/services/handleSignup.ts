const handleSignup = async (username, password) => {
    try {
        const response = await fetch('http://localhost/signup.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.success) {
            alert('Signup successful');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error signing up:', error);
    }
};

export default handleSignup;