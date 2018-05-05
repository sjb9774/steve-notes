import React, { Component } from 'react';
import { Note } from './Notes/Note';
import './App.css';

class App extends Component {
  componentDidMount() {
	var fetchProm = window.fetch("localhost:5000/api/note/0");
	fetchProm((response) => {

	})

  }

  render() {
    return (
      <div className="App">
        {this.state.notes.map(function(note, i) {
            return <Note data={note} />;
        })}
      </div>
    );
  }
}

export default App;
