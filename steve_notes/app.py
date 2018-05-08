from flask import Flask, request

app = Flask(__name__)


@app.after_request
def add_cors(response):
	response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin")
	response.headers["Access-Control-Allow-Methods"] = "PUT, POST, GET, DELETE"
	response.headers["Access-Control-Allow-Headers"] = "content-type"
	return response
