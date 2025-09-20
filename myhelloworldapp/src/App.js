import logo from "./logo.svg";
import "./App.css";
import "./styles.css";

import { useState } from 'react';
//main board component that renders the 9 squares
export default function Board() {
  const[xIsnext,setXIsnext] = useState(true);
  const[squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsnext ? "X" : "O");
  }
//the handle click function creats the copy of the squares array(nextsquares)
//then it updates the nextsquare array to add x to the first([0] index) square
  function handleClick(i){
    if(squares[i] && calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsnext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i]="O";
    }
    setSquares(nextSquares);//calling the setSquare function lets React know 
                            // the state of the component has changed.This will 
                            //trigger a re-render of the components that use the 
                            // squares state(Board) as well as its child components(the square component 
                            // that make up the Board)
    setXIsnext(!xIsnext);
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}
function Square({value, onSquareClick}) {
  //value stores the value and setvalue is the function used to change the value
  //the null passed to useState is used as the initial value for state variable
  //so value here starts off equal to null.
  //const[value, setValue] = useState(null);
  // function handleClick(){
  //   setValue('X')
  // }
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
