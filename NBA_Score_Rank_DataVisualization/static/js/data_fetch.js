
function get_score_data(){
    axios.get("api/getNBA_score_data").then((res) => {
        window.scoreData = res.data;

        // 设置自定义事件通知其他js数据已获取
        document.dispatchEvent(new Event('scoreDataReady'));
    }).catch((err) => {
        window.alert("Request failed:"+err)
        console.log('Request failed:'+err)
    })
}
function get_rank_data(){
    axios.get("api/getNBA_rank_data").then((res) => {
        window.rankData = JSON.stringify(res.data);
        // 设置自定义事件通知其他js数据已获取
        document.dispatchEvent(new Event('rankDataReady'));
    }).catch((err) => {
        window.alert("Request failed:"+err)
        console.log('Request failed:'+err)
    })
}

get_score_data()
get_rank_data()