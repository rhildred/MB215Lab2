from flask import Flask
from flask import render_template

app = Flask(__name__)

# a route where we will display a welcome message via an HTML template
@app.route("/")
def hello():  
    message = "The Flask Shop"
    return render_template('index.html', message=message)

app.run()