import { useState } from 'react';
import '../styles/app.css';
import GameBoard from './gameBoard';
import GameMenu from './menu';

function App() {
    const [playingMode, setPlayingMode] = useState(false);
    return <>{playingMode ? <GameBoard /> : <GameMenu />}</>;
}

export default App;
