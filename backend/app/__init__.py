from flask import Flask, jsonify, render_template,request

app = Flask(__name__)


@app.route('/save',  methods=["POST"])
def save():
    name = request.form["name"]
    seq1 = request.form["seq1"]
    seq2 = request.form["seq2"]
    return {"status":"ok"}
