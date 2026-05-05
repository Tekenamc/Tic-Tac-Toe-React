function GameStatus(props) {
    //Check if round won to change h2 to player won or game draw or player turn
    if(props.roundWon){
        return <h2>Player {props.turn} wins</h2>
    }
    else if(!props.board.includes("")){
        return <h2>Game is a draw</h2>
    }
    else{
        return <h2> {props.turn}'s turn</h2>
    }
}

export default GameStatus