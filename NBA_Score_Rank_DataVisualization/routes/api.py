from flask import Blueprint, jsonify
import requests
import config
import json
import json_process


api_bp = Blueprint('api', __name__)

# https://dashboard.juhe.cn/data/index/my

# 赛程比分

# 'http://apis.juhe.cn/fapig/nba/query'
@api_bp.route('/api/getNBA_score_data')
def get_score_data():
    apiUrl = 'http://127.0.0.1:5000//static/data/game_test.json'
    apiKey = config.NBA_SCORE_API_KEY
    requestParams = {'key': apiKey}
    # {"error_code":10001,"reason":"错误的请求KEY","result":null,"resultcode":"101"}
    try:
        response = requests.get(apiUrl, params=requestParams)
        response.raise_for_status()  # 检查响应状态码是否为200
        res = json.loads(response.text)
        if res['error_code'] != 0:
            return jsonify({'error': '请求异常', 'message': res['reason'], 'error_code': res['error_code']})
        else:
            # 去jso_process.py模块里把json转成二维列表再返回
            return json_process.json_process_score(res)
    except requests.exceptions.RequestException as e:
        print(f'请求异常: {e}')
        return jsonify({'error': '请求异常', 'message': str(e)})


# 'http://apis.juhe.cn/fapig/nba/rank'
# 球队排名
@api_bp.route('/api/getNBA_rank_data')
def get_new_data():
    apiUrl = 'http://127.0.0.1:5000//static/data/rank_test.json'
    apiKey = config.NBA_SCORE_API_KEY
    requestParams = {'key': apiKey}

    try:
        response = requests.get(apiUrl, params=requestParams)
        response.raise_for_status()  # 检查响应状态码是否为200
        res = json.loads(response.text)
        if res['error_code'] != 0:
            return jsonify({'error': '请求异常', 'message': res['reason'], 'error_code': res['error_code']})
        else:
            return res
    except requests.exceptions.RequestException as e:
        print(f'请求异常: {e}')
        return jsonify({'error': '请求异常', 'message': str(e)})
