import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import saveScore from '../services/saveScore'; // Import the saveScore function
import '../styles/Gameboard.css';

const Gameboard = ({ numCards = 20, difficulty = 1, user }) => {
    const navigate = useNavigate(); // Use navigate to redirect to the leaderboard
    const totalCards = Math.min(numCards, 100); // Limit to 100 cards
    const initialCards = Array.from({ length: totalCards / 2 }, (_, i) => ({
        id: `card-${i + 1}`,
        value: String.fromCharCode(65 + (i % 26)),
        isFlipped: false,
        isBlank: false,
    }));

    const pairedCards = initialCards.flatMap((card) => [
        card,
        { ...card, id: `${card.id}-pair` },
    ]);

    const blankCards = Array.from({ length: 100 - totalCards }, (_, i) => ({
        id: `blank-${i + 1}`,
        value: null,
        isFlipped: false,
        isBlank: true,
    }));

    const [cards, setCards] = useState(shuffleArray([...pairedCards, ...blankCards]));
    const [flippedCards, setFlippedCards] = useState([]);
    const [mistakes, setMistakes] = useState(0);
    const [time, setTime] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        let timer;
        if (!isGameOver) {
            timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [isGameOver]);

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const handleCardClick = (id) => {
        const clickedCard = cards.find((card) => card.id === id);
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
            const updatedCards = cards.map((card) =>
                flippedCards.some((flipped) => flipped.id === card.id)
                    ? { ...card, isFlipped: true }
                    : card
            );
            setCards(updatedCards);
            setFlippedCards([]);
            checkGameOver(updatedCards);
        } else {
            setMistakes((prevMistakes) => prevMistakes + 1);
            const updatedCards = cards.map((card) =>
                flippedCards.some((flipped) => flipped.id === card.id)
                    ? { ...card, isFlipped: false }
                    : card
            );
            setCards(updatedCards);
            setFlippedCards([]);
        }
    };

    const checkGameOver = async (updatedCards) => {
        if (updatedCards.every((card) => card.isFlipped || card.isBlank)) {
            setIsGameOver(true);
            alert(`Game Over! Time: ${time}s, Mistakes: ${mistakes}`);
            if (user) {
                // Save the score if the user is logged in
                await saveScore(time, mistakes, difficulty);
                navigate('/leaderboards'); // Redirect to the leaderboard
            } else {
                // Prompt the user to log in or sign up
                alert("Log in to save your score!");
            }
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