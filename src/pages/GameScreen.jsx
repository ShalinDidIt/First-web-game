import React from 'react';
import Gameboard from '../components/Gameboard';
import '../styles/GameScreen.css'; 

const GameScreen = () => {
    return (
        <div className='game-screen'>
            <h1>Game Screen</h1>
            <Gameboard numCards={20} /> {/* Adjust the number of cards here */}
        </div>
    );
};

export default GameScreen;