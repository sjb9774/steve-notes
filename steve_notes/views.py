from steve_notes.app import app
from flask import render_template


@app.route("/")
def home():
    return render_template("home.html", body="hi", title="Title")
