import React, { Component } from 'react';
import './Note.css';

class EditableTextDisplay extends Component {

    state = {
        content: "",
        editing: false
    }

	getText() {
		return this.state.content;
	}

    saveEditedContent() {
        var newContent = this.editor.value;
        var saveCallback = () => {
        	if (this.props.onSave) {
				this.props.onSave(this);
			}
			this.toggleEditing();
        }
        this.setState((oldState, props) => {
            return {content: newContent}
        }, saveCallback.bind(this));
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
                    <textarea id="editable-area"
                    		  ref={(e) => {this.editor = e;}}
                    		  autoFocus
                    		  onBlur={this.saveEditedContent.bind(this)}
                    		  defaultValue={this.state.content} /> :
                    <div id="display-area" onClick={this.toggleEditing.bind(this)}>
                    	{this.state.content || "Write a note!"}
                    </div>}
				</div>);
    }

}

class Note extends Component {

	onSave() {
		if (this.props.onSave) {
			this.props.onSave({id: this.props.id, title: this.titleDisplay.getText(), body: this.bodyDisplay.getText()});
		}
	}

	onDelete() {
		if (this.props.onDelete) {
			this.props.onDelete({id: this.props.id, title: this.titleDisplay.getText(), body: this.bodyDisplay.getText()});
		}
	}

    render() {
        return (
		  <div className="note">
			<h1 className="note-title">
				<EditableTextDisplay ref={(display) => this.titleDisplay = display} onSave={this.onSave.bind(this)} content={this.props.title} />
			</h1>
			<div className="note-body">
				<EditableTextDisplay ref={(display) => this.bodyDisplay = display} onSave={this.onSave.bind(this)} content={this.props.body} />
			</div>
			<button onClick={this.onDelete.bind(this)}>Delete</button>
		  </div>
    	);
    }
}

export {
    Note
}