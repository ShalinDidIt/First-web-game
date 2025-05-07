import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css'; 

const Nav = () => {
    return (
        <nav className='navbar'>
            <h1>Memory Game</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/leaderboards">Leaderboard</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;