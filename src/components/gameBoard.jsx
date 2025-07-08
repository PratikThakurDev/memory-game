import '../styles/gameBoard.css';

function GameBoard() {
    return (
        <div className="gameContainer">
            <header className="gameHeader">
                <h1 className="title">TOUCH ME NOT</h1>
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
                <div className="card" />
                <div className="card" />
                <div className="card" />
                {/* Add more cards dynamically later */}
            </div>
        </div>
    );
}

export default GameBoard;
