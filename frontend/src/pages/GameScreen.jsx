import React from 'react';
import Gameboard from '../components/Gameboard';
import '../styles/GameScreen.css'; 

const GameScreen = () => {
    return (
        <div className='game-screen'>
            <Gameboard numCards={20} /> {/* Adjust the number of cards here */}
        </div>
    );
};

export default GameScreen;