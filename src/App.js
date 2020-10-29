import { Route, BrowserRouter } from 'react-router-dom';

import HomePage from './pages/homepage.component';
import Game from './pages/game.component';
import HighScores from './pages/high-scores.component';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Route exact path="/" component={HomePage} />
        <Route path="/game" component={Game} />
        <Route path="/highScores" component={HighScores} />
      </div>
    </BrowserRouter>
  );
}

export default App;
