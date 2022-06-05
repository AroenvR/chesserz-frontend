import { Routes, Route } from 'react-router-dom';

import './App.scss';
import PlayVsPlay from './components/PlayVsPlay';
import Welcome from './components/Welcome';
import Poop from './components/Poop';

// WIP:
// http://localhost:3000/chesserz-frontend/game?white=WALLET-ADDRESS-WHITE?black=WALLET-ADDRESS-BLACK
// /chesserz-frontend/game?white=:white?black=:black
function App() {

  console.log("Hello. New. New.");

  return (
    <div id="App">      

      <Routes>

        <Route path="/chesserz-frontend/*" element={<Welcome />} />
        <Route path="/chesserz-frontend/poop" element={<Poop />} />
        <Route path="/chesserz-frontend/game/:whiteAddress/:blackAddress" element={<PlayVsPlay />} />

      </Routes>

    </div>
  );
}

export default App;

/** To add to template:
 * Routes (that work)
 * Connecting to a Smart Contract, sending & reading Smart Contracts, token transactions.
 * Build a HardHat deployment server for React Template?
 * isTruthy.js should not be forgotten. 
 */