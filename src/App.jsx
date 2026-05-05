import { useState, useRef } from 'react';
import GameStatus from './gameStatus';


function App() {

	const [board, setCells] = useState(["", "", "","", "", "", "", "", ""])
	const [isRunning, setIsRunning] = useState(true);
	const [turn, setTurn] = useState("X");
	const[roundWon, setRoundWon] = useState(false);
	const winCells = useRef([]);
	const cssRoot = document.documentElement;
	


	const winCondition = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]


	function cellClicked(index){
		if(board[index] !== "" || !isRunning){
			return;
		}

		updateCell(index);
	}


	function updateCell(index){
		//Updating the cell the player clicked on
		//b is current cell value
		const gameBoard = board.map((b, i) => {
			if( i === index){
				return turn; //builds array from what we return

			}
			else{
				return b;
			}
		});

		setCells(gameBoard);
		checkWinner(gameBoard)
	
	}


	function checkWinner(gameBoard){
		let roundWonCheck = false;
		for(let x = 0; x < winCondition.length; x++){
			const condition = winCondition[x];
			const cellA = gameBoard[condition[0]];
			const cellB = gameBoard[condition[1]];
			const cellC = gameBoard[condition[2]];

			if(cellA === "" || cellB === ""  || cellC === ""){
				continue;
			}

			if(cellA === cellB && cellB === cellC){
				roundWonCheck = true;
				winCells.current = condition;
				break;
			}
	
		}

		if(roundWonCheck){
			setIsRunning(false);
			if((winCells.current[2] - winCells.current[1]) === 4){
				cssRoot.style.setProperty("--rotation", "-45deg");
			}
			else if((winCells.current[2] - winCells.current[1]) === 2){
				cssRoot.style.setProperty("--rotation", "45deg");
			}
			else if((winCells.current[2] - winCells.current[1]) === 1){
				cssRoot.style.setProperty("--rotation", "90deg");
			}
			else{
				cssRoot.style.setProperty("--rotation", "0deg");
			}

		}
		else if(!gameBoard.includes("")){
			setIsRunning(false);
		}
		else{
			setTurn(t => (t === "X")? "O" : "X");
		}

		setRoundWon(roundWonCheck);
	}



	function restartGame(){
		setCells(["","","","","","","","",""]);
		winCells.current = [];
		setRoundWon(false);
		setIsRunning(true);
		setTurn("X");
	}



	return (
		<body>
			<div id="gameContainer">
				<h1>Tic Tac Toe</h1>
				<div id="cellContainer">
					{board.map((cell, index) =>
					<div key ={index} className={winCells.current.includes(index)? "winner-cell":"cell"} onClick={() => cellClicked(index)}>{cell}</div>)}
				</div>
				<GameStatus roundWon={roundWon} turn={turn} board={board}/>
				<button id="restartBtn" onClick={restartGame}>Restart</button>
			</div>
		</body>
		
	)
}

export default App
