'use client';
import { useState } from 'react';

/**
 * TicTacToe Classic main container
 * Two-player game with turn status, win/draw detection, and reset functionality.
 * Styling uses light theme and the provided palette:
 * - primary: #ffffff (background)
 * - secondary: #000000 (text)
 * - accent: #2196f3 (highlight)
 */

// PUBLIC_INTERFACE
export default function TicTacToeClassic() {
  // Game board state: 9 cells, each null | 'X' | 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  // true: X's turn, false: O's turn
  const [isXNext, setIsXNext] = useState(true);
  // null | 'X' | 'O' | 'Draw'
  const [status, setStatus] = useState(null);

  // Winning line combinations (cell indices)
  const winLines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];

  // Check if a winning or draw condition exists
  function calculateStatus(currentBoard) {
    for (let line of winLines) {
      const [a, b, c] = line;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a]; // 'X' or 'O'
      }
    }
    if (currentBoard.every(cell => cell)) return 'Draw';
    return null;
  }

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || status) return; // already filled or game over
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? 'X' : 'O';
    const newStatus = calculateStatus(nextBoard);
    setBoard(nextBoard);
    setIsXNext(x => !x);
    setStatus(newStatus);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus(null);
  }

  // UI texts
  let infoText;
  if (status === 'X') infoText = 'Player X wins!';
  else if (status === 'O') infoText = 'Player O wins!';
  else if (status === 'Draw') infoText = "It's a draw!";
  else infoText = `Current: Player ${isXNext ? 'X' : 'O'}`;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] max-w-xs mx-auto
         rounded-md p-6 shadow-lg bg-white"
      style={{
        backgroundColor: '#ffffff',
        color: '#000000',
      }}
    >
      {/* Current Player or Game Result */}
      <div
        className="mb-6 text-lg font-bold"
        style={{
          color: status ? '#2196f3' : '#000000',
          minHeight: '2.5em',
          textAlign: 'center'
        }}
        data-testid="status-message"
      >
        {infoText}
      </div>

      {/* 3x3 Grid */}
      <div
        className="grid grid-cols-3 grid-rows-3 gap-1 mb-8"
        style={{
          width: '264px',
          height: '264px',
          background: '#2196f3',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 8px 0 #0003',
        }}
      >
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            disabled={!!cell || !!status}
            className="flex items-center justify-center w-20 h-20 font-mono transition 
                       rounded-md text-4xl font-extrabold shadow
                       bg-white hover:bg-[#e3f1fd] focus:ring-2 focus:outline-none
                       active:bg-[#bbdbfa]"
            style={{
              color: cell === 'X' ? '#2196f3' : (cell === 'O' ? '#000000' : '#2196f3'),
              border: cell ? `2px solid ${cell === 'X' ? '#2196f3' : '#000000'}` : '2px solid #2196f3',
              cursor: cell || status ? 'not-allowed' : 'pointer',
              userSelect: 'none',
              transition: 'background 0.2s, border 0.2s'
            }}
            aria-label={`Cell ${idx + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Status and Reset */}
      <div className="flex flex-col items-center gap-3 w-full">
        {status && (
          <div
            className="font-semibold text-base"
            style={{ color: '#2196f3' }}
          >
            {status === 'Draw'
              ? "It's a draw! Try again."
              : `Congratulations! Player ${status} wins.`}
          </div>
        )}
        <button
          className="mt-2 px-5 py-2 bg-[#2196f3] text-white text-sm font-bold rounded
                     hover:bg-[#1760a9] transition active:bg-[#104074] shadow"
          style={{ border: 'none', outline: 'none' }}
          onClick={handleReset}
          data-testid="reset-button"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
