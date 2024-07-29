from waitress import serve
from app import app  # 导入你的 Flask 应用对象

# 启动服务
serve(app, host='0.0.0.0', port=5000)