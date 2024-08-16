var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
myChart.showLoading();
function fetchData(){
  // "http://127.0.0.1:5000/static/data/中华人民共和国.json"
  // "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"
    axios.get("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json").then((res) => {
        myChart.hideLoading();
        echarts.registerMap("China", { geoJSON: res.data });
        var provinceData = res.data['features'];
        var dataProvince = [];
    
        // 遍历response中的每个元素，将省级行政区名称和数值存储为字典，并添加到列表中
        provinceData.forEach(function(item) {
            var P_Data = {
                name: item['properties']['name'],
                value: item['properties']['adcode']
            };
            dataProvince.push(P_Data);
        });

        var option = {
            visualMap: {
              show: false,
              min: 0,
              max: 999999,
              realtime: true,
              inRange: {
                color: ['lightskyblue', 'white', 'blue']
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
                data: dataProvince
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
                  myChart.showLoading(); // 先显示加载动画
                  setTimeout(function() {
                      console.error('请求有错误：', error);
                      window.alert('请求有错误');
                  }, 1000); 
                });
            } else {
                myChart.showLoading();
                console.log('未找到该省份的信息');
                window.alert('未找到该省份的信息')
            }
            });
          })
          .catch(function(error) {
            myChart.showLoading();
            setTimeout(function() {
                console.error('请求有错误：', error);
                window.alert('请求有错误');
            }, 1000); 
          });
}

fetchData();