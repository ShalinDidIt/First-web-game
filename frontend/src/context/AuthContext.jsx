import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost/memory-game-backend/api/me.php', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session-based authentication
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setUser(data.user); // Set the user data
                    setUserID(data.user.id); // Set the user ID
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, userID, setUserID }}>
            {children}
        </AuthContext.Provider>
    );
};