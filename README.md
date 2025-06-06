# Веб-приложение прогноза погоды

Данное приложение было разработано в рамках тестового задания для компании o-complex.

### Введение
Данное приложение визуализирует такие данные, как:
- Погода на данный час
- Почасовая погода в течение дня

Было сделано:
- Отправки запросов к стороннему API (погоды)
- Визуализирование полученных данных
- Спроектирован интерфейс
- Добавлена адаптивность
- Добавлено запоминание последнего города (в locatStorage) для воспроизведения при первом рендере после
- Сделано автодополнение (подсказка)

### Преимущества:
- Адаптация под мобильные устройства, планшеты, ноутбуки и ПК
- Удобный скрол почасовой погоды
- Помнит последний запроса погоды и отображает при первом рендере
- Сделано автодополнение города, подсказка
- Достаточно лаконичный дизайн

### Технологии:
- NPM (Node Packet Manager) -- менеджер пакетов, входящий в состав Node.js. Позвляет инсталлировать нужные пакеты и т. д.
- TypeScript -- язык программирования, производное от JavaScript, разработанный Microsoft. Поддержка статической типизации дает большой старт, в связи с этим, такие приложения считаются наиболее надежными
- React -- библиотека, использующаяся для построения UI. Главная идея -- компонентно-ориентированный стиль -- создание независимых компонентов, переиспользуемых компонентов. Очень удобно для построения сложных интерфейсов.
- MUI (Material UI) -- UI библиотека, имеющая достаточно большое разнообразие компонентов для работы: поля, формы, таблицы, слайдеры, кнопки и т. д.
- Boostrap 5 -- UI библиотека, имеющая достаточно большое разнообразие компонентов для работы: поля, формы, таблицы, слайдеры, кнопки и т. д.
- Axios -- библиотека, позволяющая отправлять HTTP(-S) запросы всех типов. Это API для конструирования запроса к серверу

## Запуск
- Установите зависимости: `npm install` или `npm i`
- Запустите приложение: `npm run start`
- Откройте http://localhost:3000 (м. б. др. порт, в зависимости от занятости) в браузере (либо сам откроет)
