import React, { Component } from 'react';
import { Note } from './Notes/Note';
import './App.css';

class App extends Component {

  state = {
  	notes: []
  };

  saveNoteContent(noteContent) {
	window.fetch("http://localhost:5000/api/notes/" + noteContent.id, {
		method: "PUT", body: JSON.stringify({
				body: noteContent.body,
				title: noteContent.title,
			}),
		headers: {
			"content-type": "application/json"
		}
	});
  }

  deleteNote(noteContent) {
  	let self = this;
  	window.fetch("http://localhost:5000/api/notes/" + noteContent.id, {
  		method: "DELETE"
  	}).then((response) => response.json()).then((json) => {
  		self.setState((oldState, props) => {
  			let notes = oldState.notes;
  			notes = notes.filter((note) => note.id !== json.note_id);
  			return {notes: notes};
  		});
  	});
  }

  loadNotes() {
  	let self = this;
	window.fetch("http://localhost:5000/api/notes/by_user/0").then((response) => {
		return response.json();
	}).then((json) => {
		json.notes.map(function(note, i) {
			return self.setState((oldState, props) => {
				let notes = oldState.notes || [];
				notes.push(note);
				return {notes: notes};
			});
		});
	});
  }

  componentDidMount() {
	this.loadNotes();
  }

  newNote() {
  	let self = this;
  	window.fetch("http://localhost:5000/api/notes/create", {
  		method: "POST",
  		body: JSON.stringify({
  			body: "",
  			title: "New Note",
  			user_id: 0
  		}),
  		headers: {
  			"content-type": "application/json"
  		}
  	}).then((response) => {
  		return response.json();
  	}).then((json) => {
		self.setState((oldState, props) => {
			let currentNotes = oldState.notes;
			currentNotes.push({
				body: "",
				title: "New Note",
				id: json.note_id
			});
			return {notes: currentNotes};
		});
  	});

  }

  render() {
    return (
      <div className="App">
      {this.state.notes.map((function(note, i) {
      	return <Note key={note.id}
      				 id={note.id}
      				 body={note.body}
      				 title={note.title}
      				 onSave={this.saveNoteContent}
      				 onDelete={this.deleteNote.bind(this)} />;
      }).bind(this))}
      <button id="new-note" onClick={this.newNote.bind(this)}>New Note</button>
      </div>
    );
  }
}

export default App;
