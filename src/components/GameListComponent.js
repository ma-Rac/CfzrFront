import React from 'react';
import GameListItemComponent from './GameListItemComponent';
import CfzrInstance from './CfzrInstance';

class GameListComponent extends React.Component {
  selectGame(game) {
    this.props.onSelect(game);
  }



  render() {

    let component = this;
    console.log("list: currentGame",this.props.currentGame)
    return (
      <div>
        <ul>
          {this.props.games.map(function(game) {
            return (<GameListItemComponent key={game._id} currentGame={component.props.currentGame} game={game} currentPlayer={component.props.currentPlayer} onClick={component.selectGame.bind(component)} onSelect={component.selectGame.bind(component)}/>);
          })}
        </ul>


      </div>
    );
  }
}

export default GameListComponent;
