import '../styles/menu.css';

function GameMenu({ setPlayingMode }) {
    function handleButtonClick() {
        setPlayingMode(true);
    }

    return (
        <div className="menuContainer">
            <h1 className="gameTitle">TOUCH ME NOT</h1>
            <h2 className="gameSubtitle">MEMORY GAME</h2>
            <p className="warningText">Flip the cards... but never touch the same one twice.</p>

            {/* Floating cards (decorative only) */}
            <div className="floatingCards">
                <div className="cards float-left" />
                <div className="cards float-right" />
            </div>

            <div className="buttonGroup">
                <button className="play" type="button" onClick={handleButtonClick}>
                    Easy
                </button>
            </div>
        </div>
    );
}

export default GameMenu;
