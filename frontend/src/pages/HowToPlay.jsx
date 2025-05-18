import { Link } from 'react-router-dom'

const HowToPlay = () => {
    return (
        <div className="how-to-play">
            <h1>How to Play</h1>
            <p>
                The objective of the game is to find all matching pairs of cards.
                <br/><br/>
                The game consists of a grid of face-down cards. 
                When you click on a card, it flips over to reveal a letter. 
                You can then click on another card to try to find its match. 
                If the two cards match, they remain face-up. 
                If they do not match, they flip back over after a short delay. 
                <br/><br/>
                Beware, a mistake counter will keep track of your errors!
                <br/><br/>
                Try to beat your friends' scores by completing the game in the shortest time possible with the fewest mistakes!
            </p>
            <p>Want to give it a try?</p>
            <br/>
            <button>
                <Link to="/game">Click here to play!</Link>
            </button>
        </div>
    )
}

export default HowToPlay