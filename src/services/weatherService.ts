// services/weatherService.ts
import axios from 'axios';
import { City, WeatherData, WeatherResponse } from '../types/index.types';

const WEATHER_CODE_MAP: Record<number, string> = {
  0: 'Ясно',
  1: 'Преимущественно ясно',
  2: 'Переменная облачность',
  3: 'Пасмурно',
  45: 'Туман',
  48: 'Туман с инеем',
  51: 'Морось: слабая',
  53: 'Морось: умеренная',
  55: 'Морось: сильная',
  56: 'Ледяная морось: слабая',
  57: 'Ледяная морось: сильная',
  61: 'Дождь: слабый',
  63: 'Дождь: умеренный',
  65: 'Дождь: сильный',
  66: 'Ледяной дождь: слабый',
  67: 'Ледяной дождь: сильный',
  71: 'Снег: слабый',
  73: 'Снег: умеренный',
  75: 'Снег: сильный',
  77: 'Снежные зерна',
  80: 'Ливень: слабый',
  81: 'Ливень: умеренный',
  82: 'Ливень: сильный',
  85: 'Снегопад: слабый',
  86: 'Снегопад: сильный',
  95: 'Гроза',
  96: 'Гроза со слабым градом',
  99: 'Гроза с сильным градом',
};

export const fetchCities = async (query: string): Promise<City[]> => {
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=ru&format=json`,
    );
    return response.data.results || [];
  } catch (error) {
    console.error('Ошибка при поиске городов:', error);
    return [];
  }
};

export const fetchWeather = async (city: City): Promise<WeatherResponse | null> => {
  try {
    const { data } = await axios.get<WeatherData>(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude: city.latitude,
        longitude: city.longitude,
        current: 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m',
        hourly: 'temperature_2m,weather_code,precipitation_probability',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: city.timezone || 'auto',
        forecast_days: 3,
      },
    });

    return {
      city,
      current: {
        ...data.current,
        weather_description: WEATHER_CODE_MAP[data.current.weather_code] || 'Неизвестно',
      },
      hourly: data.hourly,
      daily: data.daily,
      current_units: {
        temperature_2m: '°C',
        wind_speed_10m: 'км/ч',
      },
    };
  } catch (error) {
    console.error('Ошибка при получении погоды:', error);
    return null;
  }
};
