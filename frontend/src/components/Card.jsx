import React from 'react'
import '../styles/Card.css'

const Card = ({ id, value, isFlipped, isBlank, onClick }) => {
    return (
        <div className={`card ${isBlank ? 'blank' : ''}`} 
                id={id} 
                onClick={!isBlank ? onClick : undefined} 
                // isblank={toString(isBlank)} 
                // isflipped={toString(isFlipped)}
        >
            <div className={isFlipped ? "" : "flipped"}>
                <div className="front">{isFlipped && !isBlank ? value : ''}</div>
                <div className="back"></div>
            </div>
        </div>
    )
}

export default Card