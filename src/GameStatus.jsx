function GameStatus(props) {

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