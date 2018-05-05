from steve_notes.models.users import User
from steve_notes.app import app
from steve_notes.db import Session
from flask import jsonify


@app.route("/api/users/<user_id>")
def get_user(user_id):
	session = Session()
	user_result = session.query(User).get(user_id)
	if user_result:
		return jsonify(user_result.dictify())
	return jsonify({
		"success": False,
		"error": "No user with id={user_id}".format(user_id=user_id)
	})