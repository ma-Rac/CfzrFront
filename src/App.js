import React from 'react';
import GameModel from './models/GameModel';
import NewPlayerComponent from './components/NewPlayerComponent';
import NewGameComponent from './components/NewGameComponent';
import GameListComponent from './components/GameListComponent';
import CfzrInstance from './components/CfzrInstance';
import Utils from './lib/Utils';

class App extends React.Component {
  constructor() {
    super();

    this.games = new GameModel();
    this.games.subscribe(this.updateList.bind(this));
    this.utils = new Utils();

    let playerStorage = this.utils.store("rockpaperscissors.player");
    if (playerStorage.length === 0) {
      playerStorage = null;
    }

    this.state = {
      games: [],
      currentGame: null,
      currentPlayer: playerStorage
    };
  }

  resetPlayer(){
    this.utils.store("rockpaperscissors.player", null);

    this.setState({
      currentPlayer: null
    });
  }

  updateList() {
    this.setState({
      games: this.games.resources
    });

    if (this.state.currentGame !== null) {
      let component = this;
      this.games.resources.map(function(game) {
        if (game._id === component.state.currentGame._id) {
          component.setState({
            currentGame: game
          });
          if (game.winner === null) {
          }
        }
      });
    }
  }

  setPlayerScore(points, game){
    if (game.winner == null){
      alert("You got " + points + " points!")
      console.log(game);

      if (game.playerOne == this.state.currentPlayer){
        this.games.save(game, { playerOneScore: points});
        let p1 = points;
        let p2 = game.playerTwoScore;
        this.checkWinner(game, p1, p2);
        this.clearCurrentGame();
      }
      if (game.playerTwo == this.state.currentPlayer){
        this.games.save(game, { playerTwoScore: points});
        let p1 = game.playerOneScore;
        let p2 = points;
        this.checkWinner(game, p1, p2);
        this.clearCurrentGame();
      }
    }
  }

  checkWinner(game, p1, p2){
    if (p1 !== null && p2 !== null){
      if (p1 > p2){
        this.games.save(game, { winner: game.playerOne })
      }
      if (p1 < p2){
        this.games.save(game, { winner: game.playerTwo })
      }
      if (p1 == p2){
        this.games.save(game, { winner: "Draw!" })
      }
    }
  }

  setPlayer(player) {
    this.setState({
      currentPlayer: player
    });
    this.utils.store("rockpaperscissors.player", player);
  }

  containerStyles() {
  return {
    width: "500px",
    height: "500px",
    margin: "auto",
    };
  }

  headerStyle() {
    return {
      textAlign: "center"
    };
  }

  clearCurrentGame() {
    this.setState({
      currentGame: null
    });
  }
  createGame() {
    this.games.addResource({
      playerOne: this.state.currentPlayer
    });
  }

  joinGame(game) {
    console.log("Joining game...");
    console.log(game)
    if (game.playerOne === this.state.currentPlayer || game.playerTwo === this.state.currentPlayer || game.playerTwo === null) {
      if (game.playerOne !== this.state.currentPlayer && game.playerTwo !== this.state.currentPlayer) {
        console.log("Joining game as player two...");
        this.games.save(game, { playerTwo: this.state.currentPlayer });
      }

      this.setState({
        currentGame: game
      });
    } else {
      window.alert("Can't touch this dung dung dung dung");
    }
  }


  render() {
    console.log("App, CurrentGame:",this.state.currentGame);
    return (
      <div style={this.containerStyles()}>
        <h1 style={this.headerStyle()}>CfzR Games:</h1>
        { this.state.currentPlayer !== null &&
          <p>Hi, {this.state.currentPlayer}</p> }

        { this.state.currentPlayer === null &&
          <NewPlayerComponent onCreate={this.setPlayer.bind(this)}/> }

        { this.state.currentGame === null &&
          <GameListComponent games={this.state.games} currentGame={this.state.currentGame} currentPlayer={this.state.currentPlayer} onSelect={this.joinGame.bind(this)}/> }

        { this.state.currentPlayer && this.state.currentGame === null &&
          <NewGameComponent onCreate={this.createGame.bind(this)}/> }
          <button onClick={this.resetPlayer.bind(this)}>Reset Name</button>


        { this.state.currentGame !== null && this.state.currentGame.winner == null &&               <div className="game">
          <p>Player one: {this.state.currentGame.playerOne}</p>
          <p>Player two: {this.state.currentGame.playerTwo}</p>

          <CfzrInstance currentGame={this.state.currentGame} onSelect={this.setPlayerScore.bind(this)}/>



          <div>
            <button onClick={this.clearCurrentGame.bind(this)}>Back</button>
          </div>
          { this.state.currentGame.winner !== null && <div>
            <h1>{this.state.currentGame.winner} won!</h1>
            </div> }
        </div>}
      </div>
    );
  }
}


export default App;
