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

          let web3;
          if (window.ethereum) {
            console.log("window.ethereum");
            // web3 = new Web3(window.ethereum);
            web3 = new ethers.providers.Web3Provider(window.ethereum);
          } else if (window.web3) {
            console.log("window.web3");
            // web3 = new Web3(window.web3.currentProvider);
            web3 = new ethers.providers.Web3Provider(window.web3);
          };
          console.log(web3);
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