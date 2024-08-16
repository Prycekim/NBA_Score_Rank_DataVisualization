from flask import Flask,render_template,jsonify
import pandas as pd

app = Flask(__name__)



@app.route('/')
def index():
    
    return render_template('1.html')

@app.route('/api/getdata')
def getdata():
    data = [{'value':300,'name':'qwe'},
            {'value':350,'name':'asf'},
            {'value':400,'name':'q32'},
            {'value':260,'name':'123'},
            {'value':330,'name':'435'},
            {'value':190,'name':'445'},
            ] 
    return jsonify(data)


if __name__ == 'main':
    app.debug = True
    app.run()
    
