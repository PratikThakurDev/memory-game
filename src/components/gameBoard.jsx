import { useEffect, useState } from 'react';
import '../styles/gameBoard.css';
import LoadingScreen from './loading';

function GameBoard({ setPlayingMode }) {
    const [allCharacters, setAllCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [clickedChar, setClickedChar] = useState([]);
    const [flipAll, setFlipAll] = useState(false);
    const [score, setScore] = useState(0);
    const [isDisabled, setDisable] = useState(true);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [didWin, setDidWin] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [bestScore, setBestScore] = useState(0);

    function handleHomeClick() {
        setPlayingMode(false);
    }

    function handleStart() {
        setDisable(false);
        setScore(0);
        setClickedChar([]);
        setTime(0);
        setIsRunning(true);
        setDidWin(false);
        setGameOver(false);
    }

    useEffect(() => {
        const savedBest = localStorage.getItem('bestScore');
        if (savedBest) {
            setBestScore(parseInt(savedBest));
        }
    }, []);

    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning]);

    useEffect(() => {
        if (time >= 60 && isRunning) {
            setDidWin(false);
            setIsRunning(false);
            setDisable(true);
            setGameOver(true);
        }
    }, [time, isRunning]);

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    function flipCards() {
        setDisable(true);
        setTimeout(() => {
            setFlipAll(true);
        }, 50);

        setTimeout(() => {
            setFlipAll(false);
            setDisable(false);
        }, 1000);
    }

    function shuffleCards() {
        const arr = [...allCharacters];
        let unclicked = [];

        while (true) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }

            unclicked = arr.filter((char) => !clickedChar.includes(char.mal_id));

            if (unclicked.length !== 0) break;
        }

        setTimeout(() => {
            setAllCharacters(arr);
        }, 600);
    }

    function gameEnd(clickedId) {
        if (clickedChar.includes(clickedId)) {
            setDidWin(false);
            setGameOver(true);
            setIsRunning(false);
            setDisable(true);
            return;
        }

        if (clickedChar.length === 24) {
            // next click makes it 25
            setDidWin(true);
            setGameOver(true);
            setIsRunning(false);
            setDisable(true);
        }
    }

    function gameSequence(e) {
        const clickedId = e.currentTarget.dataset.id;

        if (!clickedChar.includes(clickedId)) {
            setClickedChar((prev) => {
                const newClicked = [...prev, clickedId];
                setScore(newClicked.length);

                if (newClicked.length > bestScore) {
                    setBestScore(newClicked.length);
                    localStorage.setItem('bestScore', newClicked.length);
                }

                return newClicked;
            });
        }

        gameEnd(clickedId);
        flipCards();
        shuffleCards();
    }

    useEffect(() => {
        fetch('https://api.jikan.moe/v4/top/characters?limit=25')
            .then((res) => res.json())
            .then((data) => {
                setAllCharacters(data.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error fetching characters:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <LoadingScreen />;

    return (
        <div className="gameContainer">
            <header className="gameHeader">
                <h1 className="title" onClick={handleHomeClick}>
                    TOUCH ME NOT
                </h1>

                <div className="scoreBoard">
                    <p>
                        Score: <span>{score}</span>
                    </p>
                    <p>
                        Best Score: <span>{bestScore}</span>
                    </p>
                </div>
                <div className="timerDisplay">
                    Timer: <span>{formatTime(time)}</span>
                </div>
            </header>

            {gameOver && (
                <div className="restartOverlay">
                    <div className="restartBox">
                        <h2>{didWin ? 'YAY! YOU WON' : 'OOPS! YOU LOSE'}</h2>
                        <p>💙 Wanna Play Again?</p>
                        <button className="restartBtn" onClick={handleStart}>
                            RESTART
                        </button>
                    </div>
                </div>
            )}

            <div className="cardGrid">
                {allCharacters.slice(0, 10).map((char) => (
                    <div
                        className="card"
                        key={char.mal_id}
                        data-id={char.mal_id}
                        onClick={isDisabled ? null : gameSequence}
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

            <button className="startButton" type="button" onClick={handleStart}>
                START
            </button>
        </div>
    );
}

export default GameBoard;
