import { WeatherDisplayData, WeatherForecast } from "@/types/apiTypes";

// Функция для определения сезона по дате и широте (на английском)
function getSeason(date: Date, latitude: number): string {
  const month = date.getUTCMonth() + 1; // January = 1, December = 12
  // Northern Hemisphere
  if (latitude >= 0) {
    if (month === 12 || month === 1 || month === 2) return "winter";
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
  } else {
    // Southern Hemisphere
    if (month === 12 || month === 1 || month === 2) return "summer";
    if (month >= 3 && month <= 5) return "autumn";
    if (month >= 6 && month <= 8) return "winter";
    if (month >= 9 && month <= 11) return "spring";
  }
  return "";
}

// Форматирование времени в HH:mm (локальное время, английский)
function formatTime(unix: number, timezone: number): string {
  // unix - seconds, timezone - seconds
  const date = new Date((unix + timezone) * 1000);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}

// Форматирование даты в YYYY-MM-DD (английский стандарт)
function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toISOString().slice(0, 10);
}

// Перевод видимости из метров в километры с 1 знаком после запятой (число)
function formatVisibility(meters: number): number {
  if (meters === undefined || meters === null) return 0;
  return Number((meters / 1000).toFixed(1));
}

// Перевод скорости ветра из м/с в км/ч
function msToKmh(ms: number): number {
  if (ms === undefined || ms === null) return 0;
  return Math.round(ms * 3.6);
}

export const convertData = async (
  data: WeatherForecast
): Promise<WeatherDisplayData> => {
  // Город
  const city = data.city;

  // Первый элемент списка как "текущая" погода
  const currentItem = data.list[0];

  // Текущая погода
  const current = {
    temperature: Math.round(currentItem.main.temp),
    feelsLike: Math.round(currentItem.main.feels_like),
    condition: currentItem.weather[0]?.main || "",
    description: currentItem.weather[0]?.description || "",
    icon: currentItem.weather[0]?.icon || "",
    humidity: currentItem.main.humidity,
    windSpeed: msToKmh(currentItem.wind.speed), // km/h
    windDeg: currentItem.wind.deg, // градусы (число)
    pressure: currentItem.main.pressure,
    visibility: formatVisibility(currentItem.visibility), // km
    sunrise: formatTime(city.sunrise, city.timezone), // строка HH:mm
    sunset: formatTime(city.sunset, city.timezone), // строка HH:mm
  };

  // Почасовой прогноз
  const hourly = data.list.map((item) => ({
    time: formatTime(item.dt, city.timezone), // строка HH:mm
    temperature: Math.round(item.main.temp),
    icon: item.weather[0]?.icon || "",
    condition: item.weather[0]?.main || "",
    description: item.weather[0]?.description || "",
    windSpeed: msToKmh(item.wind.speed), // km/h
    windDeg: item.wind.deg, // градусы (число)
    humidity: item.main.humidity,
    pressure: item.main.pressure,
    pop: Math.round((item.pop || 0) * 100), // %
  }));

  // Группировка по дням для daily
  const dailyMap: { [date: string]: typeof data.list } = {};
  data.list.forEach((item) => {
    const date = new Date((item.dt + city.timezone) * 1000)
      .toISOString()
      .slice(0, 10); // YYYY-MM-DD (локальная дата)
    if (!dailyMap[date]) dailyMap[date] = [];
    dailyMap[date].push(item);
  });

  const daily = Object.entries(dailyMap).map(([date, items]) => {
    // Максимальная и минимальная температура за день
    const tempMax = Math.round(Math.max(...items.map((i) => i.main.temp_max)));
    const tempMin = Math.round(Math.min(...items.map((i) => i.main.temp_min)));
    // Первая погода дня как основная
    const first = items[0];
    // Средние значения для других параметров
    const windSpeed = msToKmh(
      items.reduce((sum, i) => sum + i.wind.speed, 0) / items.length
    );
    const windDeg = Math.round(
      items.reduce((sum, i) => sum + i.wind.deg, 0) / items.length
    );
    const humidity = Math.round(
      items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length
    );
    const pressure = Math.round(
      items.reduce((sum, i) => sum + i.main.pressure, 0) / items.length
    );
    const pop = Math.round(
      (items.reduce((sum, i) => sum + (i.pop || 0), 0) / items.length) * 100
    );

    return {
      date: formatDate(date), // YYYY-MM-DD
      tempMax,
      tempMin,
      icon: first.weather[0]?.icon || "",
      condition: first.weather[0]?.main || "",
      description: first.weather[0]?.description || "",
      windSpeed,
      windDeg,
      humidity,
      pressure,
      pop,
    };
  });

  // Сезон по текущей дате и широте города (на английском)
  const now = new Date();
  const season = getSeason(now, city.coord.lat);

  return {
    location: {
      city: city.name,
      country: city.country,
      latitude: city.coord.lat,
      longitude: city.coord.lon,
      timezone: city.timezone,
    },
    current,
    hourly,
    daily,
    sunrise: formatTime(city.sunrise, city.timezone),
    sunset: formatTime(city.sunset, city.timezone),
    season, // на английском
  };
};
