import { useEffect, useState } from "react"; 
import { Routes, Route } from 'react-router-dom';
import { ethers } from "ethers";

import './App.scss';
import PlayVsPlay from './components/PlayVsPlay';
import Welcome from './components/Welcome';
import Poop from './components/Poop';

// WIP:
// http://localhost:3000/chesserz-frontend/game?white=WALLET-ADDRESS-WHITE?black=WALLET-ADDRESS-BLACK
// /chesserz-frontend/game?white=:white?black=:black
function App() {
  const [address, setAddress] = useState("");

  console.log(address);

  return (
    <div id="App">      

      <Routes>

        <Route path="/chesserz-frontend/*" element={<Welcome />} />
        <Route path="/chesserz-frontend/poop" element={<Poop />} />
        <Route path="/chesserz-frontend/game/:whiteAddress/:blackAddress" element={<PlayVsPlay address={address} />} />

      </Routes>

      <button
        onClick={async () => {
          console.log("Updating address...");
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          const currentAddress = await web3Provider.getSigner().provider.provider.selectedAddress;

          setAddress(currentAddress);
        }}      
      >
        Update Address
      </button>

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