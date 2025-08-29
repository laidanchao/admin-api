import axios from 'axios';

class External {
  async getWeather() {
    const response = await axios.get(
      `http://d1.weather.com.cn/sk_2d/101210101.html?_=${Date.now()}`,
      {
        headers: {
          Referer: 'http://www.weather.com.cn/',
        },
      },
    );
    // {"nameen":"hangzhou","cityname":"杭州","city":"101210101","temp":"36
    //   .3","tempf":"97.3","WD":"东风","wde":"E","WS":"3级","wse":"14km\\/h","SD":"39%","sd":"39
    // %","qy":"1004","njd":"30km","time":"17:10","rain":"0","rain24h":"0","aqi":"40","aqi_pm25
    // ":"40","weather":"晴","weathere":"Sunny","weathercode":"d00","limitnumber":"5和0","date":"08月29日(星期五)"}'

    const data = JSON.parse(response.data.split('=')[1]);
    return `今日${data.cityname}天气：${data.weather}，气温${data.temp}℃；${data.WD}，${data.WS}；更新时间 ${data.time}`;
  }
}

export default new External();


