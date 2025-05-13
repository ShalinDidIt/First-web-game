import React, { useContext } from 'react';
import Gameboard from '../components/Gameboard';
import { AuthContext } from '../context/AuthContext';
import '../styles/GameScreen.css';

const GameScreen = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="game-screen">
            <Gameboard numCards={20} difficulty={1} user={user} />
        </div>
    );
};

export default GameScreen;