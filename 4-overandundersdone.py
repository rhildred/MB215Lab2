from flask import Flask
from flask import render_template
from flask import Response
from flask import request
from OverUnder4 import OverUnder

app = Flask(__name__)

dictUsers = {}

@app.route("/sms",  methods=['POST'])
def sms():
    nPhone = request.form["from"]
    sMessage = request.form["body"]
    if nPhone not in dictUsers:
        dictUsers[nPhone] = OverUnder()
    aResponse = dictUsers[nPhone].takeTurn(sMessage)
    if dictUsers[nPhone].isDone():
        del dictUsers[nPhone]
    sResponse = "<Response>"
    for sLine in aResponse:
        sResponse += "<Message>" + sLine + "</Message>"
    sResponse += "</Response>"
    return Response(sResponse, mimetype='text/xml')

# a route where we will display a welcome message via an HTML template
@app.route("/")
def server():
    return render_template('index.html')

# run the flask object now that we have subscribed
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)