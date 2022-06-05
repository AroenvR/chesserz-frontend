import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from "ethers";
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard';

import FenBoardService from '../smart_contracts/FenBoardService.json';

import { isTruthy } from '../service/isTruthy';

export default function PlayVsPlay({ boardWidth }) {
  const { whiteAddress, blackAddress } = useParams();
  // const whiteAddress = white.toUpperCase();
  // const blackAddress = black.toUpperCase();

  const chessboardRef = useRef();
  const [game, setGame] = useState();
  const [loading, setLoading] = useState(false);
  const [turnPlayer, setTurnPlayer] = useState(""); // 'white' or 'black' (taken from the incoming FEN)

  /**
   * Executed every time the page is rendered.
   * Fetches the board's current state from the backend.
   */
  useEffect(() => {

    const fetchBoardState = async () => {
      try {

        const contractAddress = FenBoardService["deployment"]["address"];
        const contractABI = FenBoardService["abi"];
        
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const smartContract = new ethers.Contract(contractAddress, contractABI, web3Provider);

        const reply = await smartContract.getBoardState(whiteAddress, blackAddress);
        console.log(reply);

        const fenStringArray = reply.split(" ");
        setTurnPlayer(fenStringArray[1]);

        setGame(new Chess(reply));
      } catch (ex) {
        console.log(ex);
        setGame(new Chess());
      }
    }

    setInterval(() => fetchBoardState(), 2000)
  }, [loading, whiteAddress, blackAddress]);

  /**
   * Update the board in the backend.
   * More info on FEN notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
   * @param {string} fen - The board's current state using FEN notation.
   */
  const updateBoard = async (fen) => {
    setLoading(true);

    try {
      const contractAddress = FenBoardService["deployment"]["address"];
      const contractABI = FenBoardService["abi"];

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const smartContract = new ethers.Contract(contractAddress, contractABI, web3Provider.getSigner());

      // Send a transaction to the smart contract to create a new board.
      const tx = await smartContract.updateBoardState(fen, whiteAddress, blackAddress);
      await tx.wait();
      console.log(tx);

    } catch (ex) {
      console.log(ex);

    } finally {
      setLoading(false);
    }
  }
  
  /**
   * 
   * @returns 
   */
  const validateCurrentPlayer = () => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const playerAddress = web3Provider.getSigner().provider.provider.selectedAddress.toLowerCase();
    
    if (turnPlayer === "w") {
      if (playerAddress == whiteAddress.toLowerCase()) {
        return true;
      }
    } else {
      if (playerAddress == blackAddress.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  /**
   * Resets the board (or undoes the last move WIP)
   */
  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      
      updateBoard(update.fen());

      return update;
    });
  }

  /**
   * Updates the board after a move.
   */
  function onDrop(sourceSquare, targetSquare) {
    if(!validateCurrentPlayer()) return;

    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    if (move) {
      updateBoard(game.fen());

      return move;
    }
  }

  /**
   * Creates a new game for address_white and address_black.
   */
  const createNewBoard = async () => {
    setLoading(true);

    try {
      
      const contractAddress = FenBoardService["deployment"]["address"];
      const contractABI = FenBoardService["abi"];

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const smartContract = new ethers.Contract(contractAddress, contractABI, web3Provider.getSigner());

      // Send a transaction to the smart contract to create a new board.
      const tx = await smartContract.createNewBoard(whiteAddress, blackAddress);
      await tx.wait();
      console.log(tx);

    } catch (ex) {
      console.log(ex);
       
    } finally {
      setLoading(false);
    }
  }

  const renderBoard = () => {
    if (!isTruthy(game))  return (<h1>Loading ...</h1>);
    if (loading)  return (<h1>Loading ...</h1>);

    return (
      <div>
        <Chessboard
          id="PlayVsPlay"
          animationDuration={200}
          boardWidth={boardWidth}
          position={game.fen()}
          onPieceDrop={onDrop}
          showBoardNotation={true}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
          }}
          ref={chessboardRef}
        />
  
        <button
          className="rc-button"
          onClick={() => {
            safeGameMutate((game) => {
              game.reset();
            });
            chessboardRef.current.clearPremoves();
          }}
        >
          reset
        </button>
  
        <button
          className="rc-button"
          onClick={() => {
            safeGameMutate((game) => {
              game.undo();
            });
            chessboardRef.current.clearPremoves();
          }}
        >
          undo
        </button>
  
        <button
          className="rc-button"
          onClick={() => createNewBoard()}
        >
          Create new game
        </button>
      </div>
    );
  }

  return renderBoard();
  
}