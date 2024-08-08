from flask import Flask,render_template,jsonify
import pandas as pd

app = Flask(__name__)



@app.route('/')
def index():
    # 把csv文件里的内容送到index.html
    # data = pd.read_csv('')
    # data = data.rename(columns={'':'','':''})
    # data = data.to_dict(orient='records')
    return render_template('index.html')

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
    app.debug = False
    app.run()
    
