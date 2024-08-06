import requests

url = 'https://echarts.apache.org/examples/data/asset/geo/USA.json'
res = requests.get(url = url)


print(res.text)