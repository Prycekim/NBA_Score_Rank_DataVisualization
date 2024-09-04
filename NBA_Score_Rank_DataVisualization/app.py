from flask import Flask
from routes.home import home_bp
from routes.api import api_bp
import logging
import config

app = Flask(__name__)

# 注册蓝图
app.register_blueprint(home_bp)
app.register_blueprint(api_bp)

# 设置日志记录到文件和控制台


def setup_logging():
    # 创建文件处理程序
    file_handler = logging.FileHandler('access_log.txt', encoding='utf-8')
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s - %(levelname)s - %(message)s'))

    # 创建控制台处理程序
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)
    console_handler.setFormatter(logging.Formatter(
        '%(asctime)s - %(levelname)s - %(message)s'))

    # 获取 Flask 应用程序的根日志记录器
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.DEBUG)

    # 添加处理程序到日志记录器
    root_logger.addHandler(file_handler)
    root_logger.addHandler(console_handler)


setup_logging()

if __name__ == '__main__':
    app.debug = True
    app.run(host=config.SERVER_HOST, port=config.SERVER_PORT)
