var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
myChart.showLoading();
var adcode;

async function fetchData() {
  try {
      myChart.showLoading(); // 显示加载动画
      // "http://127.0.0.1:5000/static/data/中华人民共和国.json"
      // "https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json"
      const response = await axios.get("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json");
      myChart.hideLoading(); // 隐藏加载动画

      echarts.registerMap("China", { geoJSON: response.data });
      const provinceData = response.data['features'];
      const dataProvince = provinceData.map(item => ({
          name: item['properties']['name'],
          value: item['properties']['adcode']
      }));

      const option = {
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
                  label: { show: true },
                  data: dataProvince
              },
          ],
      };
      myChart.setOption(option);

      myChart.on('click', async (params) => {
          try {
              const provinceName = params.name;
              const result = await fetchProvinceData(provinceName);
              const mapData = result.mapData;

              echarts.registerMap(provinceName, { geoJSON: mapData });
              const dataCitys = mapData['features'].map(item => ({
                  name: item['properties']['name'],
                  value: item['properties']['adcode'],
              }));

              const option = {
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
                          name: `${provinceName}地图`,
                          type: 'map',
                          map: provinceName,
                          label: { show: true },
                          data: dataCitys,
                      },
                  ],
              };
              myChart.setOption(option);
          } catch (error) {
              myChart.showLoading();
              window.alert('请求有错误');
          }
      });
  } catch (error) {
      myChart.showLoading();
      window.alert('请求有错误');
  }
}

async function fetchProvinceData(provinceName) {
  try {
      const response = await axios.get('http://127.0.0.1:5000/static/data/省级行政区.json');
      const geojsonData = response.data;
      const adcode = geojsonData[provinceName];

      if (!adcode) {
          throw new Error('未找到该省份的信息');
      }

      const searchLink = `https://geo.datav.aliyun.com/areas_v3/bound/${encodeURIComponent(adcode)}_full.json`;
      const mapResponse = await axios.get(searchLink);
      
      return { adcode, mapData: mapResponse.data };
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
}


fetchData();