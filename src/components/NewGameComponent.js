import React from 'react';

class NewGameComponent extends React.Component {

  createGame(event) {
    event.preventDefault();
    console.log("Create Game Called!");
    this.props.onCreate();
  }

  render() {
    return(
      <div>
        <form onSubmit={this.createGame.bind(this)}>
          <div>
            <input type="submit" value="Create New Game"/>
          </div>
        </form>
      </div>
    );
  }
}

export default NewGameComponent;
