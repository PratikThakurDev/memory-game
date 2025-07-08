import { useState } from 'react';
import '../styles/app.css';
import GameBoard from './gameBoard';
import GameMenu from './menu';

function App() {
    const [playingMode, setPlayingMode] = useState(false);
    return (
        <>
            {playingMode ? (
                <GameBoard setPlayingMode={setPlayingMode} />
            ) : (
                <GameMenu setPlayingMode={setPlayingMode} />
            )}
        </>
    );
}

export default App;
