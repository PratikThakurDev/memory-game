import { useEffect, useState } from 'react';
import '../styles/gameBoard.css';

function GameBoard({ setPlayingMode }) {
    const [allCharacters, setAllCharacters] = useState([]);

    function handleHomeClick() {
        setPlayingMode(false);
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
                {allCharacters.map((char) => (
                    <div className="card" key={char.mal_id}>
                        <img src={char.images.jpg.image_url} alt={char.name} />
                        <p>{char.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameBoard;
