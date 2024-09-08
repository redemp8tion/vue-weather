export const fetchWeatherData = async (city, unit) => {
  const apiKey = "5ce61b107390ba58323d0f7b554a7625";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
  );
  const data = await response.json();
  if (data.cod !== 200){
    alert(data.message)
    throw new Error(data.message);
  } 
  return data;
};

export const fetchForecastWeatherData = async (city, unit) => {
  const apiKey = "5ce61b107390ba58323d0f7b554a7625";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
  );
  const data = await response.json();
  
  if (data.cod !== "200"){
    alert(data.message)
    throw new Error(data.message);
  } 
  try {
    const weeklyForecast = [];

    // 每8个数据代表一天（因为一天有24小时，24/3=8）
    for (let i = 0; i < data.list.length; i += 8) {
      if (i >= 56) break; // 只处理前7天的数据

      const dayData = data.list.slice(i, i + 8);
      const dayInfo = {
        weekday: new Date(dayData[0].dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        minTemp: Math.min(...dayData.map((item) => item.main.temp)),
        maxTemp: Math.max(...dayData.map((item) => item.main.temp)),
        weather: dayData[0].weather[0].main,
        icon: dayData[0].weather[0].icon,
      };
      weeklyForecast.push(dayInfo);
    }

    return weeklyForecast;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return [];
  }
};

// 天气图标
// https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/01d.png
