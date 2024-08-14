var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
myChart.showLoading();
function fetchData(){
    
    axios.get("https://echarts.apache.org/examples/data/asset/geo/USA.json").then((res) => {
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