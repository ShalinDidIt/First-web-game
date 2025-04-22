export const handleLogin = async (username, password) => {
    try {
        const response = await fetch('http://your-backend-url/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            return { success: true, username: data.username };
        } else {
            return { success: false, message: data.message || 'Login failed. Please try again.' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};

export const handleSignup = async (username, password) => {
    try {
        const response = await fetch('http://your-backend-url/signup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.success) {
            return { success: true };
        } else {
            return { success: false, message: data.message || 'Signup failed. Please try again.' };
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return { success: false, message: 'An error occurred. Please try again.' };
    }
};