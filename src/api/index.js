
export const fetchTemperature = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
  const data = await response.json();
  return data.main.temp;
};