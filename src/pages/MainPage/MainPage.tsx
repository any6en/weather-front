import { FC, useEffect, useState } from 'react';
import WeatherDisplay from './component/WeatherDisplay';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import CitySearch from './component/CitySearch';
import { fetchWeather } from '../../services/weatherService';
import { City, WeatherResponse } from '../../types/index.types';

const MainPage: FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLoadLocalStore, setLoadLocalStore] = useState<boolean>(false);

  useEffect(() => {
    // Восстановление последнего выбранного города из localStorage
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      try {
        setSelectedCity(JSON.parse(lastCity));

        setLoadLocalStore(true);
      } catch (e) {
        console.error('Failed to parse last city', e);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      loadWeatherData(selectedCity);
    }
  }, [selectedCity]);

  const loadWeatherData = async (city: City) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather(city);
      if (data) {
        setWeatherData(data);
      } else {
        setError('Не удалось загрузить данные о погоде');
      }
    } catch (err) {
      setError('Произошла ошибка при загрузке данных');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setLoadLocalStore(false);
    localStorage.setItem('lastCity', JSON.stringify(city));
  };

  return (
    <Container className="pt-3 pt-md-4 pt-lg-5 px-3 px-md-4">
      <Row className="justify-content-center mb-3 mb-md-4">
        <Col xs={12} md={10} lg={8}>
          <h1 className="text-center display-4 display-md-3 display-lg-2 fw-bold">
            Прогноз погоды
          </h1>
        </Col>
      </Row>

      <Row className="justify-content-center mb-3 mb-md-4">
        <Col xs={12} sm={10} md={8} lg={6}>
          <CitySearch onCitySelect={handleCitySelect} />
        </Col>
      </Row>

      {loading && (
        <Row className="justify-content-center my-2 my-md-4">
          <Col xs="auto">
            <div className="d-flex align-items-center">
              <Spinner animation="border" variant="primary" className="me-2" />
              <span className="fs-5 fs-md-4">Загрузка данных...</span>
            </div>
          </Col>
        </Row>
      )}

      {error && (
        <Row className="justify-content-center my-2 my-md-4">
          <Col xs={12} sm={10} md={8}>
            <Alert variant="danger" className="text-center fs-5 fs-md-4">
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {weatherData && !loading && (
        <Row className="justify-content-center">
          {isLoadLocalStore && <h4 className="text-center">Приветствуем, Ваш последний запрос:</h4>}
          <Col xs={12} md={10} lg={8}>
            <WeatherDisplay weatherData={weatherData} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MainPage;
