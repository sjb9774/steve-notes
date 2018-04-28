import React, { Component } from 'react';
import { Note } from './Notes/Note';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Note title="Note 1" body="Hello World!" />
        <Note title="Note 2" body="Goodbye World!" />
      </div>
    );
  }
}

export default App;
