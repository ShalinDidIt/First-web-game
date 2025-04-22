import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Gameboard.css'; // Import the CSS file for the grid

const Gameboard = ({ numCards = 20 }) => {
    // Ensure numCards is even for pairs
    const totalCards = Math.min(numCards, 100); // Limit to 100 cards
    const initialCards = Array.from({ length: totalCards / 2 }, (_, i) => ({
        id: `card-${i + 1}`, // Assign unique IDs
        value: String.fromCharCode(65 + (i % 26)), // Assign letters A-Z cyclically
        isFlipped: false,
        isBlank: false, // Regular cards are not blank
    }));

    // Duplicate cards to create pairs and assign unique IDs to duplicates
    const pairedCards = initialCards.flatMap((card) => [
        card,
        { ...card, id: `${card.id}-pair` }, // Unique ID for the duplicate
    ]);

    // Add blank cards to fill the grid
    const blankCards = Array.from({ length: 100 - totalCards }, (_, i) => ({
        id: `blank-${i + 1}`, // Unique IDs for blank cards
        value: null, // Blank cards have no value
        isFlipped: false,
        isBlank: true, // Mark as blank
    }));

    // Combine and shuffle cards
    const [cards, setCards] = useState(shuffleArray([...pairedCards, ...blankCards]));
    const [flippedCards, setFlippedCards] = useState([]);
    const [mistakes, setMistakes] = useState(0); // Mistake counter
    const [time, setTime] = useState(0); // Timer in seconds
    const [isGameOver, setIsGameOver] = useState(false); // Game over state

    useEffect(() => {
        let timer;
        if (!isGameOver) {
            timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
        }
        return () => clearInterval(timer); // Cleanup timer on unmount or game over
    }, [isGameOver]);

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const handleCardClick = (id) => {
        const clickedCard = cards.find((card) => card.id === id);

        // Ignore clicks on blank cards or already flipped cards
        if (clickedCard.isFlipped || clickedCard.isBlank || flippedCards.length === 2) return;

        const updatedCards = cards.map((card) =>
            card.id === id ? { ...card, isFlipped: true } : card
        );

        setCards(updatedCards);
        const newFlippedCards = [...flippedCards, clickedCard];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setTimeout(() => checkMatch(newFlippedCards), 1000);
        }
    };

    const checkMatch = (flippedCards) => {
        if (flippedCards[0].value === flippedCards[1].value) {
            setFlippedCards([]);
            checkGameOver();
        } else {
            setMistakes((prevMistakes) => prevMistakes + 1); // Increment mistakes
            const updatedCards = cards.map((card) =>
                flippedCards.some((flipped) => flipped.id === card.id)
                    ? { ...card, isFlipped: false }
                    : card
            );
            setCards(updatedCards);
            setFlippedCards([]);
        }
    };

    const checkGameOver = () => {
        if (cards.every((card) => card.isFlipped || card.isBlank)) {
            setIsGameOver(true);
            alert(`Game Over! Time: ${time}s, Mistakes: ${mistakes}`);
            // Here you can send the data to the leaderboard
        }
    };

    return (
        <div>
            <div className="game-info">
                <p>Time: {time}s</p>
                <p>Mistakes: {mistakes}</p>
            </div>
            <div className="gameboard">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        value={card.value}
                        isFlipped={card.isFlipped}
                        isBlank={card.isBlank}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gameboard;