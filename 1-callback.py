from flask import Flask
from flask import render_template
from flask import Response
from flask import request

# we make a flask object
app = Flask(__name__)

# the sms service calls this "web hook"
@app.route("/sms",  methods=['POST'])
def sms():
    nPhone = request.form["from"]
    sMessage = request.form["body"]
    return Response("<Response><Message>" + sMessage + " sms from " + nPhone + " answered here</Message></Response>", mimetype='text/xml')

# a route where we will display a welcome message via an HTML template
@app.route("/")
def server():  
    return render_template('index.html')

# run the flask object now that we have subscribed
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)