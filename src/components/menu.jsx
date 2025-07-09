import { useState } from 'react';
import '../styles/menu.css';

function GameMenu({ setPlayingMode }) {
    const [showInfo, setShowInfo] = useState(false);
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
                    Play
                </button>
            </div>
            <div className="infoIcon" onClick={() => setShowInfo(!showInfo)}>
                ?
            </div>
            {showInfo && (
                <div className="infoPopup">
                    <p>1️⃣ Do not touch the same card twice.</p>
                    <p>2️⃣ Click the title to go back.</p>
                </div>
            )}
        </div>
    );
}

export default GameMenu;
