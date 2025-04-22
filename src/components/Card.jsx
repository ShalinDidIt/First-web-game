import React from 'react';
import './Card.css';

const Card = ({ id, value, isFlipped, isBlank, onClick }) => {
    return (
        <div className={`card ${isBlank ? 'blank' : ''}`} onClick={!isBlank ? onClick : undefined}>
            <div className={isFlipped ? "" : "flipped"}>
                <div className="front">{isFlipped && !isBlank ? value : ''}</div>
                <div className="back"></div>
            </div>
        </div>
    );
};

export default Card;