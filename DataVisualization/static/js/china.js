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
                  { name: '北京市', value: 1201},
                  { name: '天津市', value: 15502},
                  { name: '河北省', value: 15003},
                  { name: '山西省', value: 28804},
                  { name: '内蒙古自治区', value: 24005},
                  { name: '辽宁省', value: 322001},
                  { name: '吉林省', value: 312001},
                  { name: '黑龙江省', value: 231002},
                  { name: '上海市', value: 23003},
                  { name: '江苏省', value: 224004},
                  { name: '浙江省', value: 1099},
                  { name: '安徽省', value: 9001},
                  { name: '福建省', value: 122001},
                  { name: '江西省', value: 11201},
                  { name: '山东省', value: 226001},
                  { name: '河南省', value: 282001},
                  { name: '湖北省', value: 21001},
                  { name: '湖南省', value: 19001},
                  { name: '广东省', value: 13401},
                  { name: '广西壮族自治区', value: 12001},
                  { name: '海南省', value: 11201},
                  { name: '重庆市', value: 123401},
                  { name: '四川省', value: 153601},
                  { name: '贵州省', value: 1801},
                  { name: '云南省', value: 83001},
                  { name: '西藏自治区', value: 94002},
                  { name: '陕西省', value: 7001},
                  { name: '甘肃省', value: 8701},
                  { name: '青海省', value: 3401},
                  { name: '宁夏回族自治区', value: 1601},
                  { name: '新疆维吾尔自治区', value: 11001},
                  { name: '台湾省', value: 10002},
                  { name: '香港特别行政区', value: 10002},
                  { name: '澳门特别行政区', value: 10002}
              ],
              },
            ],
          };
          myChart.setOption(option);
          // 处理点击事件并且呈现省份地图
          myChart.on('click', function(params) {
            // 创建一个字典存储省份名称和对应的行政区代码
            var adcodeDict = {
              '北京市': 110000,
              '天津市': 120000,
              '河北省': 130000,
              '山西省': 140000,
              '内蒙古自治区': 150000,
              '辽宁省': 210000,
              '吉林省': 220000,
              '黑龙江省': 230000,
              '上海市': 310000,
              '江苏省': 320000,
              '浙江省': 330000,
              '安徽省': 340000,
              '福建省': 350000,
              '江西省': 360000,
              '山东省': 370000,
              '河南省': 410000,
              '湖北省': 420000,
              '湖南省': 430000,
              '广东省': 440000,
              '广西壮族自治区': 450000,
              '海南省': 460000,
              '重庆市': 500000,
              '四川省': 510000,
              '贵州省': 520000,
              '云南省': 530000,
              '西藏自治区': 540000,
              '陕西省': 610000,
              '甘肃省': 620000,
              '青海省': 630000,
              '宁夏回族自治区': 640000,
              '新疆维吾尔自治区': 650000,
              '台湾省': 710000,
              '香港特别行政区': 810000,
              '澳门特别行政区': 820000
            };
            var provinceName = params.name; // 获取省份名称
            var adcode = adcodeDict[provinceName]; // 根据省份名称从字典中获取对应的行政区划分代码
        
            if (adcode) {
                var searchLink = 'https://geo.datav.aliyun.com/areas_v3/bound/' + encodeURIComponent(adcode) + '_full.json';
                    // 动态加载对应省份的地图数据
                axios.get(searchLink).then(function(response) {
                    echarts.registerMap(provinceName, { geoJSON: response.data });

                    var mapData = response.data['features'];
                    var dataNames = [];
                
                    // 遍历response中的每个元素，将城市名称和数值存储为字典，并添加到列表中
                    mapData.forEach(function(item) {
                        var cityData = {
                            name: item['properties']['name'],
                            value: item['properties']['adcode']
                        };
                        dataNames.push(cityData);
                    });

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
                        text: provinceName,
                        left: 'left',
                      },
                      series: [
                        {
                          name: provinceName+'地图',
                          type: 'map',
                          map: provinceName,
                          label: {
                            show: true
                          },
                          data: dataNames,
                        },
                      ],
                    };
                    myChart.setOption(option);


                })
                .catch(function(error) {
                    console.error('Error fetching map data:', error);
                });
            } else {
                console.log('未找到该省份的信息');
            }
            });
          })
        .catch(error => {
            myChart.showLoading();
            console.error('Error fetching data:', error);
            console.error('Error details:', error.response);
        });
}

fetchData();