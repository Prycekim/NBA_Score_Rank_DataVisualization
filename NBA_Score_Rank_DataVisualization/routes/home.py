from flask import Blueprint, render_template
import config
import time
home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def index():
    timestamp = time.time()
    return render_template('index.html', network_host=config.SERVER_HOST, network_port=config.SERVER_PORT,timestamp=timestamp)
