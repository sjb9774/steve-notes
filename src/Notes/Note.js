import React, { Component } from 'react';
import './Note.css';

class EditableTextDisplay extends Component {

    state = {
        content: "",
        editing: false
    }

    saveEditedContent() {
        var newContent = this.editor.value;
        this.setState((oldState, props) => {
            return {content: newContent}
        });
        this.toggleEditing();
    }

    toggleEditing() {
        this.setState((oldState, props) => {
            return {editing: !oldState.editing};
        });
    }

    componentDidMount() {
        this.setState((oldState, props) => {
            return {editing: false, content: props.content}
        });
    }

    render() {
        return (<div>{this.state.editing ?
                    <textarea id="editable-area" ref={(e) => {this.editor = e;}} autoFocus onBlur={this.saveEditedContent.bind(this)} defaultValue={this.state.content} /> :
                    <div id="display-area" onClick={this.toggleEditing.bind(this)}>{this.state.content || "Write a note!"}</div>}</div>)
    }

}

class Note extends Component {

    render() {
        return (
      <div className="note">
        <h1 className="note-title">{this.props.title}</h1>
        <div className="note-body">
            <EditableTextDisplay content={this.props.body} />
        </div>
      </div>
    );
    }
}

export {
    Note
}