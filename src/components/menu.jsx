import '../styles/menu.css';

function GameMenu() {
    return (
        <div className="menuContainer">
            <h1 className="gameTitle">TOUCH ME NOT</h1>
            <h2 className="gameSubtitle">MEMORY GAME</h2>
            <p className="warningText">Flip the cards... but never touch the same one twice.</p>

            {/* Floating cards (decorative only) */}
            <div className="floatingCards">
                <div className="card float-left" />
                <div className="card float-right" />
            </div>

            <div className="buttonGroup">
                <button className="difficultyBtn">Easy</button>
                <button className="difficultyBtn">Medium</button>
                <button className="difficultyBtn">Hard</button>
            </div>
        </div>
    );
}

export default GameMenu;
