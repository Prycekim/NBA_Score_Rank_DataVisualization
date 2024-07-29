from flask import Flask


app = Flask(__name__)

@app.route('/')
def index():
    return 'you have already start this project'


if __name__ == 'main':
    app.debug = True
    app.run()