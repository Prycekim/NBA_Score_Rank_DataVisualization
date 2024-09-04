document.addEventListener('DOMContentLoaded', function() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    // 显示加载动画
    myChart.showLoading();

    // 监听 scoreDataReady 事件，等待获取数据
    document.addEventListener('scoreDataReady', function() {
        document.addEventListener('rankDataReady', function() {
            fetchData();
            //更新表格
            updateRankTable();
        });
    });

    let isCardVisible = false; // 标记卡片是否可见
    let hideTimeout = null; // 定时器 ID
    let isSwitching = false; // 标记是否正在切换

    async function fetchData() {
        try {
            const timestamp = new Date().getTime();
            const response_USA = await axios.get(`http://${window.networkHost}:${window.networkPort}/static/data/USA.json`);
            const response_nba_teams = await axios.get(`http://${window.networkHost}:${window.networkPort}/static/data/nba_teams.json`);
            myChart.hideLoading(); // 隐藏加载动画
            var geoUSAJSON = response_USA.data;
            var geoTeamJSON = response_nba_teams.data['teams'];
            echarts.registerMap("America", geoUSAJSON, {
                Alaska: {
                    left: -131,
                    top: 25,
                    width: 15
                },
                Hawaii: {
                    left: -110,
                    top: 28,
                    width: 5
                },
                'Puerto Rico': {
                    left: -76,
                    top: 26,
                    width: 2
                }
            });
            const provinceData = response_USA.data['features'];
            
            // 创建州数据与汉语名的映射
            const stateChineseMap = geoTeamJSON.reduce((acc, team) => {
                acc[team.state] = team.state_chinese;
                return acc;
            }, {});

            // 将数据省份与球队 ID 映射
            const dataProvince = provinceData.map(item => ({
                name: item['properties']['name'],
                value: geoTeamJSON.find(team => team.state === item['properties']['name']) ? geoTeamJSON.find(team => team.state === item['properties']['name']).id : 0
            }));

            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        // 获取州名
                        const stateName = params.name;
                        // 根据州名找到对应的中文名
                        const stateChinese = stateChineseMap[stateName];
                        // 查找对应的球队
                        const teamsInState = geoTeamJSON.filter(team => team.state === stateName);
                        const teamsList = teamsInState.map(team => team.team_name).join('<br/>');

                        // 返回 tooltip 的格式化内容
                        return `${stateChinese}<br/>所属球队:<br/>${teamsList}`;
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderColor: '#333',
                    borderWidth: 1,
                    padding: [10, 15],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    extraCssText: 'border-radius: 4px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);'
                },
                visualMap: {
                    show: false,
                    realtime: true,
                    min: 0,
                    max: 3,
                    inRange: {
                        color: ['white', 'lightskyblue', 'lightgreen', 'yellow']
                    }
                },
                title: {
                    text: 'NBA DATA',
                    left: 'left',
                },
                series: [
                    {
                        name: 'USA_MAP',
                        type: 'map',
                        map: 'America',
                        itemStyle: {
                            normal: {
                                areaColor: '#555'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        },
                        label: { show: false },
                        data: dataProvince,
                    },
                ],
            };
            myChart.setOption(option);

            myChart.on('mouseover', async (params) => {
                try {
                    // 清除之前的隐藏定时器
                    if (hideTimeout) {
                        clearTimeout(hideTimeout);
                        hideTimeout = null;
                    }

                    // 获取州名
                    const stateName = params.name;
                    // 查找对应的球队
                    const teamsInState = geoTeamJSON.filter(team => team.state === stateName);
                    // 球队信息列表
                    const teamsList = teamsInState.map(team => team.team_name);
                    // window.alert(Array.isArray(window.scoreData)); // 应该输出 true
                    // window.alert(window.scoreData)
                    updatescoreTable(teamsList)
                    // 显示卡片并更新内容
                    if (isCardVisible) {
                        hideCard(); // 如果卡片已经可见，先隐藏
                        setTimeout(() => {
                            fetchProvinceData();
                        }, 300); // 等待隐藏动画完成
                    } else {
                        fetchProvinceData();
                    }

                    isCardVisible = true; // 标记卡片为可见
                    isSwitching = true; // 标记正在切换
                } catch (error) {
                    myChart.showLoading();
                    window.alert('请求有错误' + error);
                }
            });

            myChart.on('mouseout', function() {
                // 设置一个定时器，延迟隐藏卡片
                hideTimeout = setTimeout(() => {
                    isCardVisible = false; // 标记卡片为不可见
                    isSwitching = false; // 标记正在切换
                    hideCard();
                }, 300); // 等待动画完成的时间
            });

        } catch (error) {
            myChart.showLoading();
            window.alert('请求有错误' + error);
        }
    }

    async function fetchProvinceData() {

        var teamInfoElement = document.getElementById('teamInfo');
        var teamRankElement = document.getElementById('teamRank');
        
        teamInfoElement.classList.remove('hide');
        teamInfoElement.classList.add('show');
        
        if(!isSwitching){
            teamRankElement.classList.remove('show');
            teamRankElement.classList.add('hide');
        }
    
       
        
    }

    function hideCard() {
        var teamInfoElement = document.getElementById('teamInfo');
        var teamRankElement = document.getElementById('teamRank');
        teamInfoElement.classList.remove('show');
        teamInfoElement.classList.add('hide');
        if(!isSwitching){
            teamRankElement.classList.remove('hide');
            teamRankElement.classList.add('show');
        }

    }
});

function updateRankTable() {
    const data = JSON.parse(window.rankData);
    // 获取 ranking 的第三个元素
    const thirdRanking = data.result.ranking[2];

    // 获取第三个元素的 list
    const rankData = thirdRanking.list.slice(0, 15);
    //找到表格元素
    const table = document.querySelector('#teamRank table');
    
    // 清空表格内容，保留表头
    table.innerHTML = `
        <tr>
            <th>排名</th>
            <th>球队</th>
            <th>胜场</th>
            <th>败场</th>
            <th>胜率</th>
            <th>场均得分</th>
            <th>场均失分</th>
        </tr>
    `;
    
    // 动态生成表格行
    rankData.forEach(team => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.rank_id}</td>
            <td>${team.team}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td>${team.wins_rate}</td>
            <td>${team.avg_score || 'N/A'}</td> <!-- 使用 'N/A' 表示无数据 -->
            <td>${team.avg_lose_score || 'N/A'}</td>
        `;
        table.appendChild(row);
    });
}

///////////
function updatescoreTable(teamsList) {
    const data = window.scoreData // 确保 data 是一个二维数组

    // 找到表格元素
    const table = document.querySelector('#teamInfo table');

    // 清空表格内容，保留表头
    table.innerHTML = `
        <tr>
            <th>主队</th>
            <th>客队</th>
            <th>主队得分</th>
            <th>客队得分</th>
            <th>比赛状态</th>
            <th>日期</th>
        </tr>
    `;

    let hasMatches = false; // 标记是否找到符合条件的比赛

    // 筛选并显示符合条件的比赛信息
    data.forEach(match => {
        const [homeTeam, awayTeam, status, homeScore, awayScore, date] = match;

        // 判断比赛中的主队是否在当前州的球队列表中
        if (teamsList.includes(homeTeam)) {
            hasMatches = true; // 标记找到符合条件的比赛
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${homeTeam}</td>
                <td>${awayTeam}</td>
                <td>${homeScore}</td>
                <td>${awayScore}</td>
                <td>${status}</td>
                <td>${date}</td>
            `;
            table.appendChild(row);
        }
    });

    // 如果没有找到任何比赛，添加一行显示“-”
    if (!hasMatches) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
        `;
        table.appendChild(row);
    }
}
