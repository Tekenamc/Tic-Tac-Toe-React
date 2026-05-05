import { useState, useRef } from 'react';
import GameStatus from './gameStatus';


function App() {

	//Setting the state variables
	const [board, setCells] = useState(["", "", "","", "", "", "", "", ""])//Represents the board
	const [isRunning, setIsRunning] = useState(true);//Checks whether the game is running
	const [turn, setTurn] = useState("X");
	const[roundWon, setRoundWon] = useState(false);//Checks if someone won
	const winCells = useRef([]);//Winning cell combo
	const cssRoot = document.documentElement;//Access the root in css file
	

	//winning combos
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

	//check if cell clicked
	function cellClicked(index){
		if(board[index] !== "" || !isRunning){//if  game is not runnign and cell clicked isn't empty
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
				return b;//rest of the array unchanged
			}
		});

		setCells(gameBoard);//set the board to the updtaed copy
		checkWinner(gameBoard)
	
	}

	//check if there's a winner
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

			//if the cells are the same then there is a winner
			if(cellA === cellB && cellB === cellC){
				roundWonCheck = true;
				winCells.current = condition;//set winCells to the cell combo to find winnig cells
				break;
			}
	
		}

		//checking the win direction of the line
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
		//Game is a draw
		else if(!gameBoard.includes("")){
			setIsRunning(false);
		}
		//Game is not a draw and no one has won yet switch player
		else{
			setTurn(t => (t === "X")? "O" : "X");
		}
		//roundwon state variable
		setRoundWon(roundWonCheck);
	}


	//restartGame
	function restartGame(){
		setCells(["","","","","","","","",""]);
		winCells.current = [];
		setRoundWon(false);
		setIsRunning(true);
		setTurn("X");
	}


	//check if the index of any of the cells from the board is in
	//winCells so we can chnage the css styling and apply the effects
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
