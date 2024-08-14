var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
myChart.showLoading();
function fetchData(){
    
    axios.get("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json").then((res) => {
        myChart.hideLoading();
        echarts.registerMap("China", { geoJSON: res.data });
        
        var option = {
            visualMap: {
              show: false,
              min: 1111,
              max: 333332,
              realtime: true,
              inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
              }
            },
            tooltip: {},
            title: {
              text: '中国',
              left: 'left',
            },
            series: [
              {
                name: '中国地图',
                type: 'map',
                map: 'China',
                label: {
                  show: true
                },
                data: [
                  { name: '北京市', value: 1201 },
                  { name: '天津市', value: 15502 },
                  { name: '河北省', value: 15003 },
                  { name: '山西省', value: 28804 },
                  { name: '内蒙古自治区', value: 24005 },
                  { name: '辽宁省', value: 322001 },
                  { name: '吉林省', value: 312001 },
                  { name: '黑龙江省', value: 231002 },
                  { name: '上海市', value: 23003 },
                  { name: '江苏省', value: 224004 },
                  { name: '浙江省', value: 1099 },
                  { name: '安徽省', value: 9001 },
                  { name: '福建省', value: 122001 },
                  { name: '江西省', value: 11201 },
                  { name: '山东省', value: 226001 },
                  { name: '河南省', value: 282001 },
                  { name: '湖北省', value: 21001 },
                  { name: '湖南省', value: 19001 },
                  { name: '广东省', value: 13401 },
                  { name: '广西壮族自治区', value: 12001 },
                  { name: '海南省', value: 11201 },
                  { name: '重庆市', value: 123401 },
                  { name: '四川省', value: 153601 },
                  { name: '贵州省', value: 1801 },
                  { name: '云南省', value: 83001 },
                  { name: '西藏自治区', value: 94002 },
                  { name: '陕西省', value: 7001 },
                  { name: '甘肃省', value: 8701 },
                  { name: '青海省', value: 3401 },
                  { name: '宁夏回族自治区', value: 1601 },
                  { name: '新疆维吾尔自治区', value: 11001 },
                  { name: '台湾省', value: 10002 },
                  { name: '香港特别行政区', value: 10002 },
                  { name: '澳门特别行政区', value: 10002 }
                ]
              },
            ]
          };
          myChart.setOption(option);
          })
        .catch(error => {
            myChart.showLoading();
            console.error('Error fetching data:', error);
            console.error('Error details:', error.response);
        });
}

fetchData();