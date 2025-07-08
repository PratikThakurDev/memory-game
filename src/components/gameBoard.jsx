import { useEffect, useState } from 'react';
import '../styles/gameBoard.css';

function GameBoard({ setPlayingMode }) {
    const [allCharacters, setAllCharacters] = useState([]);

    function handleHomeClick() {
        setPlayingMode(false);
    }

    function shuffleCards() {
        const arr = [...allCharacters];

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setAllCharacters(arr);
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
                {allCharacters.slice(0, 12).map((char) => (
                    <div className="card" key={char.mal_id} onClick={shuffleCards}>
                        <img src={char.images.jpg.image_url} alt={char.name} />
                        <p>{char.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
