import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { City } from '../../../types/index.types';

interface CitySearchProps {
  onCitySelect: (city: City) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); // Для ошибки загрузки

  useEffect(() => {
    if (inputValue.length < 1) {
      setOptions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchCities(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const fetchCities = async (query: string): Promise<void> => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get<{ results?: City[] }>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=100&language=en&format=json`, // Обратные кавычки
      );
      setOptions(response.data.results || []);
    } catch (error) {
      console.error('Ошибка при загрузке городов:', error);
      setOptions([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option: City) =>
        `${option.name}, ${option.country}${option.admin1 ? `, ${option.admin1}` : ''}`
      }
      isOptionEqualToValue={(option: City, value: City) => option.id === value.id}
      loading={loading}
      onInputChange={(_, newValue: string) => setInputValue(newValue)}
      onChange={(_, newValue: City | null) => {
        if (newValue) {
          onCitySelect(newValue);
        }
      }}
      filterOptions={(x) => x} // отключение фильтрации встроенного
      noOptionsText="Нет подходящих вариантов"
      loadingText={
        <>
          Загружаем варианты <CircularProgress color="inherit" size={20} />
        </>
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Поиск по городу"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CitySearch;
