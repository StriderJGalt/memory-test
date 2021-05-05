from flask import Flask, jsonify, render_template,request

app = Flask(__name__)

@app.route('/',  )
def page():
    return render_template("experiment.html")

@app.route('/data',  )
def data():
    fileName = "data.csv"
    f = open(fileName, 'r')
    cont = f.read()
    return cont 

@app.route('/send',  methods=["POST"])
def save():
    name = request.form["name"]
    age = request.form["age"]
    cb = request.form["cb"]
    bw = request.form["bw"]
    cw = request.form["cw"]
    print(name,age,cb,bw,cw)
    writestring = request.remote_addr + ", " + name + ", " + age + ", " + cb + ", " + bw + ", " + cw + "\n"
    fileName = "data.csv"
    with open(fileName, 'a') as f:
        f.write(writestring)
    return {"status":"ok"}
