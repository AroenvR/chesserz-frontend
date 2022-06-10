import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from "ethers";
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard';

// import FenBoardService from '../smart_contracts/FenBoardService.json';
import FenService_Metis from '../smart_contracts/FenService_Metis.json';

import { isTruthy } from '../service/isTruthy';

export default function PlayVsPlay({ boardWidth, address }) {
  const { whiteAddress, blackAddress } = useParams();

  const chessboardRef = useRef();
  const [game, setGame] = useState();
  const [loading, setLoading] = useState(false);
  const [turnPlayer, setTurnPlayer] = useState(""); // 'white' or 'black' (taken from the incoming FEN)

  // console.log("Turn player: " + turnPlayer);
  // console.log("Current board state: " + game.fen());

  /**
   * Executed every time the page is rendered.
   * Fetches the board's current state from the backend.
   */
  useEffect(() => {

    const fetchBoardState = async () => {
      try {

        const contractAddress = FenService_Metis["address"];//FenBoardService["deployment"]["address"];
        const contractABI = FenService_Metis["abi"];
        
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const smartContract = new ethers.Contract(contractAddress, contractABI, web3Provider);

        const reply = await smartContract.getBoardState(whiteAddress, blackAddress);

        const fenStringArray = reply.split(" ");
        setTurnPlayer(fenStringArray[1]);

        setGame(new Chess(reply));
      } catch (ex) {
        console.log(ex);
        setGame(new Chess());
      }
    }

    setInterval(() => fetchBoardState(), 2000)
  }, [address, loading, whiteAddress, blackAddress]);

  /**
   * Update the board in the backend.
   * More info on FEN notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
   * @param {string} fen - The board's current state using FEN notation.
   */
  const updateBoard = async (fen) => {
    setLoading(true);

    try {
      const contractAddress = FenService_Metis["address"]; //FenBoardService["deployment"]["address"];
      const contractABI = FenService_Metis["abi"];

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const smartContract = new ethers.Contract(contractAddress, contractABI, web3Provider.getSigner());

      // Send a transaction to the smart contract to create a new board.
      const tx = await smartContract.updateBoard(fen, whiteAddress, blackAddress);
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
    console.log("Validating user...");
    // const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    // const playerAddress = web3Provider.getSigner().provider.provider.selectedAddress.toLowerCase();
    
    console.log("Actual turn player: " + turnPlayer);

    switch (turnPlayer) {
      case "w":
        console.log("Entered case w");
        if (address.toLowerCase() === whiteAddress.toLowerCase()) {
          console.log("White's move is accepted.");
          return true;
        }
        break;

      case "b":
        console.log("Entered case b");
        if (address.toLowerCase() === blackAddress.toLowerCase()) {
          console.log("Black's move is accepted.");
          return true;
        }
        break;

      default:
        console.log("Entered default");
        return false;
    }

    // if (turnPlayer == "w") {
    //   console.log("Turn player === w");
    //   console.log(address + " === " + whiteAddress);
    //   if (address.toLowerCase() == whiteAddress.toLowerCase()) {
    //     console.log("White's move is accepted.");
    //     return true;
    //   }
    // } else {
    //   console.log("Turn player == w");
    //   console.log(address + " === " + blackAddress);
    //   if (address.toLowerCase() == blackAddress.toLowerCase()) {
    //     console.log("Black's move is accepted.");
    //     return true;
    //   }
    // }

    // return false;
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
    console.log("User attempted to move a piece.");
    // if(!validateCurrentPlayer()) return; // TODO: This validation doesn't work yet.
    // console.log("User was validated and allowed to move the piece.");

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
      
      const contractAddress = FenService_Metis["address"]; // FenBoardService["deployment"]["address"];
      const contractABI = FenService_Metis["abi"];

      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const smartContract = new ethers.Contract(contractAddress, contractABI, web3Provider.getSigner());

      // Send a transaction to the smart contract to create a new board.
      const tx = await smartContract.createBoard(whiteAddress, blackAddress);
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
          new game
        </button>
      </div>
    );
  }

  return renderBoard();
  
}