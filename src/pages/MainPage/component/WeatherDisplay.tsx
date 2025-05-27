import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { WeatherData } from '../../../types/index.types';

interface WeatherDisplayProps {
  weatherData?: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️';
    if (code > 0 && code < 50) return '⛅';
    if (code >= 50 && code < 70) return '🌧️';
    if (code >= 70 && code < 90) return '❄️';
    return '⛈️';
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) return 'Сегодня';

    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
  };

  console.log(weatherData);
  console.log(weatherData.current);
  console.log(weatherData.current.surface_pressure);
  console.log(weatherData.current_units.surface_pressure);

  return (
    <Card className="mt-4 shadow weather-card">
      <Card.Body className="p-4">
        {/* Основная информация о погоде */}
        <div className="text-center mb-4">
          <h2 className="mb-1">
            {weatherData.city.name}, {weatherData.city.country}
          </h2>
          <p className="text-muted mb-3">
            {new Date(weatherData.current.time).toLocaleDateString('ru-RU', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </p>

          <div className="d-flex justify-content-center align-items-center">
            <div className="display-1 me-4">{Math.round(weatherData.current.temperature_2m)}°</div>
            <div>
              <div className="display-3">{getWeatherIcon(weatherData.current.weather_code)}</div>
              <div className="fs-5">{weatherData.current.weather_description}</div>
            </div>
          </div>
        </div>

        {/* Дополнительные параметры */}
        <Row className="g-3 mb-4">
          <Col xs={6} md={6}>
            <div className="weather-param p-3 rounded text-center">
              <div>💨 Ветер</div>
              <div className="fw-bold">
                {weatherData.current.wind_speed_10m} {weatherData.current_units.wind_speed_10m}
              </div>
            </div>
          </Col>
          <Col xs={6} md={6}>
            <div className="weather-param p-3 rounded text-center">
              <div>💧 Влажность</div>
              <div className="fw-bold">
                {weatherData.current.relative_humidity_2m}
                {weatherData.current_units.relative_humidity_2m}
              </div>
            </div>
          </Col>
        </Row>

        {/* Почасовой прогноз с горизонтальной прокруткой */}
        <div className="mb-4">
          <h5 className="mb-3">Почасовой прогноз</h5>
          <div className="position-relative">
            {/* Кнопка "Назад" */}
            <button
              className="position-absolute start-0 top-50 translate-middle-y btn btn-sm btn-light rounded-circle p-2 z-1"
              style={{ left: '-15px' }}
              onClick={() => {
                const container = document.querySelector('.hourly-scroll-container');
                if (container) container.scrollBy({ left: -200, behavior: 'smooth' });
              }}
            >
              &lt;
            </button>

            <div className="hourly-scroll-container">
              <div className="hourly-scroll-content">
                {weatherData.hourly.time.slice(0, 24).map((time: string, index: number) => (
                  <div key={time} className="hourly-item text-center p-2 rounded">
                    <div className="fw-bold">
                      {new Date(time).toLocaleTimeString([], { hour: '2-digit' })}
                    </div>
                    <div className="fs-5 my-1">
                      {getWeatherIcon(weatherData.hourly.weather_code[index])}
                    </div>
                    <div className="fw-bold">
                      {Math.round(weatherData.hourly.temperature_2m[index])}°
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопка "Вперед" */}
            <button
              className="position-absolute end-0 top-50 translate-middle-y btn btn-sm btn-light rounded-circle p-2 z-1"
              style={{ right: '-15px' }}
              onClick={() => {
                const container = document.querySelector('.hourly-scroll-container');
                if (container) container.scrollBy({ left: 200, behavior: 'smooth' });
              }}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Дневной прогноз (если есть данные) */}
        {weatherData.daily && (
          <div>
            <h5 className="mb-3">Прогноз на неделю</h5>
            <Row className="g-2">
              {weatherData.daily.time.map((time: string, index: number) => (
                <Col key={time} xs={6} sm={4} md={3} lg={2}>
                  <div className="daily-item p-2 rounded text-center">
                    <div className="fw-bold">{getDayName(time)}</div>
                    <div className="fs-4 my-1">
                      {getWeatherIcon(weatherData.daily.weather_code[index])}
                    </div>
                    <div>
                      <span className="fw-bold">
                        {Math.round(weatherData.daily.temperature_2m_max[index])}°
                      </span>
                      <span className="text-muted ms-2">
                        {Math.round(weatherData.daily.temperature_2m_min[index])}°
                      </span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default WeatherDisplay;
