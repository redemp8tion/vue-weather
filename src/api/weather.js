export const fetchWeatherData = async (city) => {
    const apiKey = '1507272ff76d54316f3b285110d59a34';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (data.cod !== 200) throw new Error(data.message);
    return data;
};