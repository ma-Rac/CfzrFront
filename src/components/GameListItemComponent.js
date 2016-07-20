import React from 'react';

class GameListItemComponent extends React.Component {
  selectGame() {
    this.props.onClick(this.props.game);
  }

  gameOpen() {
    return !this.gameFinished() &&
      this.props.game.winner === null &&
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === null ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameAlreadyJoined() {
    return !this.gameFinished() &&
      this.props.game.winner === null &&
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  hasScore() {
    if (!this.gameFinished()){
      if (this.props.game.winner === null){
        if(this.props.game.playerOne === this.props.currentPlayer){
          if(this.props.game.playerOneScore !== null){
            return true;
          }else{
            return false;
          }
        }
        if(this.props.game.playerTwo === this.props.currentPlayer){
          if(this.props.game.playerTwoScore !== null){
            return true;
          }else{
            return false;
          }
        }
      }
    }
  }

  gameFull() {
    return !this.gameOpen();
  }

  gameFinished() {
    return this.props.game.winner !== null;
  }

  playerOrYou(player) {
    if (player === this.props.currentPlayer) {
      return "You";
    }
    return player;
  }

  theWinner() {
    if (this.gameFinished()) {
      if (this.props.game.winner === "draw") {
        return `Draw between ${this.playerOrYou(this.props.game.playerOne)} and ${this.playerOrYou(this.props.game.playerTwo)}`;
      }
      return `${this.playerOrYou(this.props.game.winner)} won`;
    } else {
      return "Nobody";
    }
  }

  render() {
    return (
      <li>
        Game by {this.props.game.playerOne}

        { this.gameOpen() && !this.gameAlreadyJoined() &&
          <button onClick={this.selectGame.bind(this)}>Join Game</button> }

        { this.gameOpen() && this.gameAlreadyJoined() && !this.hasScore() &&
          <button onClick={this.selectGame.bind(this)}>Resume Game</button> }

        { !this.gameFinished() && this.gameFull() &&
          <span>(Full)</span> }

        { this.gameFinished() &&
          <span>({this.theWinner()})</span> }
      </li>
    );
  }
}

export default GameListItemComponent;
