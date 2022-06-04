import { useEffect, useState, useRef } from 'react';
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard';

import axiosConfig from '../service/axiosConfig';
import { isTruthy } from '../service/isTruthy';

export default function PlayVsPlay({ boardWidth }) {
  const chessboardRef = useRef();
  const [game, setGame] = useState();

  const address_white = "0xWhite";
  const address_black = "0xBlack";

  /**
   * Executed every time the page is rendered.
   * Fetches the board's current state from the backend.
   */
  useEffect(() => {

    const fetchBoardState = async () => {
      const url = `api/fen/board-state?white=${address_white}&black=${address_black}`;
      await axiosConfig.get(url)
            .then(resp => {
              if (resp.status === 200) {
                setGame(new Chess(resp.data));
              }
            })
            .catch(ex => {
                console.log(ex);
            });
    }

    fetchBoardState();
  }, []);

  /**
   * Update the board in the backend.
   * More info on FEN notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
   * @param {string} fen - The board's current state using FEN notation.
   */
  const updateBackendBoard = async (fen) => {
    const url = `api/fen/update-board?fen=${fen}&white=${address_white}&black=${address_black}`;
    await axiosConfig.post(url)
            .then(resp => {
              if (resp.status === 201) {
                setGame(new Chess(resp.data));
              }
            })
            .catch(ex => {
                console.log(ex);
            });
  }      

  /**
   * Resets the board (or undoes the last move WIP)
   */
  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      
      updateBackendBoard(update.fen());

      return update;
    });
  }

  /**
   * Updates the board after a move.
   */
  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    if (move) {
      updateBackendBoard(game.fen());

      return move;
    }
  }

  /**
   * Creates a new game for address_white and address_black.
   */
  const createNewGame = () => {
    const url = `api/fen/create-game?white=${address_white}&black=${address_black}`;
    axiosConfig.post(url)
            .then(resp => {
                if (resp.status === 201) {
                  setGame(new Chess(resp.data));
                }
            })
            .catch(ex => {
                console.log(ex);
            });
  }

  const renderBoard = () => {
    if (!isTruthy(game))  return (<h1>Loading ...</h1>);

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
          onClick={() => createNewGame()}
        >
          Create new game
        </button>
      </div>
    );
  }

  return renderBoard();
  
}