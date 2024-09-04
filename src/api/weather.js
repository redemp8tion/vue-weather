export const fetchWeatherData = async (city) => {
    const apiKey = '5ce61b107390ba58323d0f7b554a7625';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (data.cod !== 200) throw new Error(data.message);
    return data;
};