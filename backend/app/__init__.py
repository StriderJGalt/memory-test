from flask import Flask, jsonify, render_template,request

app = Flask(__name__)


@app.route('/save',  methods=["POST"])
def save():
    name = request.form["name"]
    age = request.form["age"]
    cb = request.form["cb"]
    bw = request.form["bw"]
    cw = request.form["cw"]
    print(name,age,cb,bw,cw)
    return {"status":"ok"}
