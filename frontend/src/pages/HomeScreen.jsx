import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { handleLogin, handleSignup } from '../services/authService';

const HomeScreen = () => {
    // const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
    // const [user, setUser] = useState(null); // Store logged-in user

    // const login = async (username, password) => {
    //     const result = await handleLogin(username, password);
    //     if (result.success) {
    //         setUser({ username: result.username });
    //     } else {
    //         alert(result.message);
    //     }
    // };

    // const signup = async (username, password) => {
    //     const result = await handleSignup(username, password);
    //     if (result.success) {
    //         alert('Signup successful! Please log in.');
    //         setIsLogin(true);
    //     } else {
    //         alert(result.message);
    //     }
    // };

    return (
        <div>
            <h1>Welcome to the Memory Game</h1>
            {/* {user ? ( */}
                <div>
                    {/* <h2>Hello, {user.username}!</h2> */}
                    <nav>
                        <Link to="/game">Start Game</Link>
                        <br />
                        <Link to="/leaderboards">View Leaderboards</Link>
                    </nav>
                </div>
            {/* // ) : (
            //     <div>
            //         {isLogin ? ( */}
            {/* //             <Login onLogin={login} />
            //         ) : (
            //             <Signup onSignup={signup} />
            //         )}
            //         <button onClick={() => setIsLogin(!isLogin)}>
            //             {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            //         </button>
            //     </div> */}
            {/* // )} */}
        </div>
    );
};

export default HomeScreen;