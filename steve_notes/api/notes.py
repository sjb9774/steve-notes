from steve_notes.models.notes import Note
from steve_notes.models.users import User
from steve_notes.app import app
from steve_notes.db import db_session
from flask import jsonify, request


@app.route("/api/notes/create", methods=["POST"])
def create_note():
	data = request.get_json()
	if data:
		with db_session() as session:
			note = Note()
			note.body = data.get("body")
			note.title = data.get("title")
			note.user_id = data.get('user_id')
			session.add(note)
		return jsonify({"success": True, "note_id": note.id})
	return jsonify({"success": False, "message": "No data passed"})


@app.route("/api/notes/<note_id>", methods=["GET"])
def retrieve_note(note_id):
	with db_session() as session:
		note_result = session.query(Note).get(note_id)
		if note_result:
			return jsonify(note_result.dictify())
		return jsonify({
			"success": False,
			"message": f"No note exists with id={note_id}"
		})


@app.route("/api/notes/<note_id>", methods=["PUT"])
def update_note(note_id):
	with db_session() as session:
		note_result = session.query(Note).filter_by(id=note_id)
		rows_affected = note_result.update(request.get_json())
	return jsonify({"success": True, "rows_affected": rows_affected})


@app.route("/api/notes/<note_id>", methods=["DELETE"])
def delete_note(note_id):
	with db_session() as session:
		note_result = session.query(Note).get(note_id)
		if note_result:
			session.delete(note_result)
			return jsonify({"success": True})
	return jsonify({"success": False, "message": f"No note exists with id={note_id}"})


@app.route("/api/notes/by_user/<user_id>", methods=["GET"])
def get_notes_by_user(user_id):
	with db_session() as session:
		query = session.query(Note).filter_by(user_id=user_id)
		notes_result = query.all()
		return jsonify({"success": True, "notes": [note.dictify() for note in notes_result]})