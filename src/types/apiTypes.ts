export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

export interface WeatherCurrent {
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  visibility: number;
  sunrise: string; // ISO строка времени
  sunset: string; // ISO строка времени
}

export interface WeatherHourly {
  time: string; // ISO строка времени или "HH:mm"
  temperature: number;
  icon: string;
  condition: string;
  description: string;
  windSpeed: number;
  windDeg: number;
  humidity: number;
  pressure: number;
  pop: number; // вероятность осадков
}

export interface WeatherDaily {
  date: string; // ISO строка даты
  tempMax: number;
  tempMin: number;
  icon: string;
  condition: string;
  description: string;
  windSpeed: number;
  windDeg: number;
  humidity: number;
  pressure: number;
  pop: number;
}

export interface WeatherDisplayData {
  location: WeatherLocation;
  current: WeatherCurrent;
  hourly: WeatherHourly[];
  daily: WeatherDaily[];
  sunrise: string;
  sunset: string;
  season: string;
}
