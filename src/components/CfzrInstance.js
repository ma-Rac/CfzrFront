import React from 'react';
import GameListItemComponent from './GameListItemComponent';

class CfzrInstance extends React.Component {
  constructor(){
    super();

    this.state = {
      canvas: null,
      ctx: null,
      originalPosition: {},
      playerPosition: {x: 70, y: 300, width: 20, height: 20},
      player2Position: {x: 70, y: 300, width: 20, height: 20},
      floorPosition: {x: 0, y: 400},
      ceilingPosition: {x: 0, y: 0},
      enemyPositions: [],
      confuzerPosition: {x: 800, y: 250},
      graviturnerPosition: { x: 2000, y: 200},
      speed: 200,
      numberOfRedraws: 0,
      points: 0,
      points2: 0,
      gravity: 5,
      refresher: null
    }
  }

  componentDidMount(){
    let component = this;
    this.gamestats = this.props.currentGame;
    window.addEventListener("keydown", this.eventHandler.bind(this), false);
    // console.log("gamestats:",this.gamestats);
    alert("ready?");
    var refresh = setInterval(this.updateGame.bind(component), 100);
    this.setState({
      refresher: refresh
    })
  }

  componentWillUnmount(){
    clearInterval(this.state.refresher);
  }

  gameOpen() {
    return !this.gameFinished() &&
      this.props.game.winner === "None" &&
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

  renderFloor(position, color) {
  const ctx = this.refs.canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, 500, 250);
  }

  renderCeiling(position, color) {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, 500, 100);
  }


  gameFinished() {
    return this.props.game.winner !== 'None';
  }

  renderPlayer(position, color) {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, 20, 20);
  }

  renderEnemies(positions, color) {
    const ctx = this.refs.canvas.getContext('2d');
    positions.map(function(position){
      ctx.fillStyle = color;
      ctx.fillRect(position.x, position.y, 20, 20)
    })
  }

  renderConfuzer(position, color) {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, 40, 20);
  }

  renderGraviturner(position, color) {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, 40, 20);
  }

  renderPoints(positions) {
    let points = this.state.points;
    let tempEnemy = [];
    positions.map(function(position){
      if (position.x < -1) {
        points += 1;
        console.log(points);
      }else{
        tempEnemy.push(position);
      }
    });

    if (this.state.confuzerPosition.x === 0) {
      points += 5;
      this.state.confuzerPosition.x = this.getRandomInt(700, 1200);
    }
    let returnarr = [points, tempEnemy];
    return returnarr;
  }

  mommaShip(){
    if (this.getRandomInt(0,30) === 5){
      var x = {x: 500, y: this.getRandomInt(100, 380), speed: this.getRandomInt(1,10), width: 20, height: 20};
      this.state.enemyPositions.push(x);
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  gravityEffect(player){
    player.y = player.y + this.state.gravity;
    if (player.y > 380){
      player.y = 380
    };
    if (player.y < 100){
      player.y = 100
    };
    return player;
  }

  graviTurn(){
   if (this.state.graviturnerPosition.x > 0 && this.state.graviturnerPosition.x < 500) {
     this.state.gravity = -2
   } else {
     this.state.gravity = 2
   }
 }

 objectCollision(positions,playerpos,refr,component) {
    var reaction = false;
    positions.map(function(position){
      if (playerpos.x < position.x + position.width &&
         playerpos.x + playerpos.width > position.x &&
         playerpos.y < position.y + position.height &&
         playerpos.height + playerpos.y > position.y) {
          reaction = true;
      //  clearInterval(refr);
      //  alert("that'll do pig, that'll do");
     }
    });
   if (reaction == true){
    //  console.log(this);
    clearInterval(refr);
    this.props.onSelect(this.state.points,this.props.currentGame);
   }
  }

  updateGame(){
    // console.log(this)
    const ctx = this.refs.canvas.getContext('2d');
    const canvas = this.refs.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.renderFloor(this.state.floorPosition, "#dab9a2");
    this.renderCeiling(this.state.ceilingPosition, "#dab9a2");
    this.renderPlayer(this.state.playerPosition, "#4d5565");
    this.renderConfuzer(this.state.confuzerPosition, "#db2b39" );
    this.renderEnemies(this.state.enemyPositions, "#81c1bf")
    this.renderGraviturner(this.state.graviturnerPosition, "black" );
    this.mommaShip();
    this.graviTurn();
    this.objectCollision(this.state.enemyPositions, this.state.playerPosition, this.state.refresher, this);
    var tempEnemy = [];
    this.state.enemyPositions.map(function(position){
      position.x -= position.speed;
      tempEnemy.push(position)
    });
    var newconfuzer = {x: this.state.confuzerPosition.x -4, y: this.state.confuzerPosition.y}
    var newgraviturner = {x: this.state.graviturnerPosition.x -4, y: this.state.graviturnerPosition.y}
    var returned = this.renderPoints(this.state.enemyPositions);
    // console.log("TEMPENEMY", tempEnemy);
    this.setState({
      playerPosition: this.gravityEffect(this.state.playerPosition),
      confuzerPosition: newconfuzer,
      graviturnerPosition: newgraviturner,
      enemyPositions: returned[1],
      points: returned[0],
    });
  }

  jumpPlayer(){
    let pos = this.state.playerPosition;
    if (this.state.graviturnerPosition.x > 0 && this.state.graviturnerPosition.x < 500) {
      pos.y += 30;
    } else {
      pos.y -= 30;
    }
    if (pos.y < 100){
     pos.y = 100;
    }
    if (pos.y > 380){
      pos.y = 380;
    }
    // console.log("other Readme!",pos)
    this.updateGame.bind(this);
  }

  selectGame(game) {
    game = this.props.game;
    this.props.onSelect(game);
  }

  styler(){
    return {
      border: "1px solid #000000"
      };
  }


  eventHandler(e){
    if (this.state.confuzerPosition.x > 0 && this.state.confuzerPosition.x < 500) {
      if (e.keyCode == '40') {
        e.preventDefault();
        this.jumpPlayer();
      }
    } else {
      if (e.keyCode == '38') {
        e.preventDefault();
        this.jumpPlayer();
      }
    }
  }

  render() {
    let component = this;
    // console.log("Game instance:",this.props.currentGame)
    // console.log("Game instance owngame", component.props.game)
    let gamex = component.props.game
    // console.log("Game instance, this:", this)
    return (
        <div>
          Game by {this.props.currentGame.playerOne}
          <canvas ref="canvas" id="board" width="500px" height="500px" style={this.styler()}>
          </canvas>
        </div>
    );
  }
}

export default CfzrInstance;
