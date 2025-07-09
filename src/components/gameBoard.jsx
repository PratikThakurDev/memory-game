import { useEffect, useState } from 'react';
import '../styles/gameBoard.css';

function GameBoard({ setPlayingMode }) {
    const [allCharacters, setAllCharacters] = useState([]);
    const [clickedChar, setClickedChar] = useState([]);
    const [flipAll, setFlipAll] = useState(false);

    function handleHomeClick() {
        setPlayingMode(false);
    }

    function shuffleCards(e) {
        const { target } = e;
        const clickedId = target.dataset.id;

        // Don't add if already clicked
        if (!clickedChar.includes(clickedId)) {
            setClickedChar([...clickedChar, clickedId]);
        }

        const arr = [...allCharacters];
        let unclicked = [];

        setTimeout(() => {
            setFlipAll(true);
        }, 50); // tiny delay ensures DOM is ready

        // Step 3: Reset the flip after delay
        setTimeout(() => {
            setFlipAll(false);
        }, 1000);

        // keep shuffling until there's at least one unclicked character
        while (true) {
            // shuffle
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }

            // find unclicked cards
            unclicked = arr.filter((char) => {
                for (let j = 0; j < clickedChar.length; j++) {
                    if (char.mal_id == clickedChar[j]) {
                        return false;
                    }
                }
                return true;
            });

            // exit loop if unclicked found
            if (unclicked.length !== 0) break;
        }

        setTimeout(() => {
            setAllCharacters(arr);
        }, 600);
    }

    useEffect(() => {
        fetch('https://api.jikan.moe/v4/top/characters?limit=25')
            .then((res) => res.json())
            .then((data) => {
                setAllCharacters(data.data);
            })
            .catch((error) => {
                console.error('Error fetching characters:', error);
            });
    }, []);
    return (
        <div className="gameContainer">
            <header className="gameHeader">
                <h1 className="title" onClick={handleHomeClick}>
                    TOUCH ME NOT
                </h1>
                <div className="scoreBoard">
                    <p>
                        Score: <span>0</span>
                    </p>
                    <p>
                        Best Score: <span>0</span>
                    </p>
                </div>
            </header>

            <div className="cardGrid">
                {allCharacters.slice(0, 10).map((char) => (
                    <div
                        className="card"
                        key={char.mal_id}
                        data-id={char.mal_id}
                        onClick={shuffleCards}
                    >
                        <div className={`cardInner ${flipAll ? 'flipped' : ''}`}>
                            <div className="cardFront">
                                <img src={char.images.jpg.image_url} alt={char.name} />
                                <p>{char.name}</p>
                            </div>
                            <div className="cardBack">❓</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
