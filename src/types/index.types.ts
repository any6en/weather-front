// types.ts
export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  timezone: string;
}

export interface WeatherCurrent {
  time: string;
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
}

export interface WeatherHourly {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
}

export interface WeatherDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

export interface WeatherData {
  city: any;
  current: any;
  current_units: any;
  hourly: any;
  daily: any;
}

export interface WeatherResponse {
  city: City;
  current: WeatherCurrent & {
    weather_description: string;
  };
  hourly: WeatherHourly;
  daily: WeatherDaily;
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
  };
}
