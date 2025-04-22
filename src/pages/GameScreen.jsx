// filepath: /home/duke/Development/code/practice/memory-game/src/pages/GameScreen.jsx
import React from 'react';
import Gameboard from '../components/Gameboard';

const GameScreen = () => {
    return (
        <div>
            <h1>Game Screen</h1>
            <Gameboard numCards={20} /> {/* Adjust the number of cards here */}
        </div>
    );
};

export default GameScreen;