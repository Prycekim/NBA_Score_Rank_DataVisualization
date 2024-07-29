from flask import Flask,render_template
import pandas as pd

app = Flask(__name__)



@app.route('/')
def index():
    # 把csv文件里的内容送到index.html
    data = pd.read_csv('')
    data = data.rename(columns={'':'','':''})
    data = data.to_dict(orient='records')
    return render_template('index.html',data = data)


if __name__ == 'main':
    app.debug = False
    app.run()