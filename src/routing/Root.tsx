import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';

import MainPage from '../pages/MainPage/MainPage';

function Root() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Root;
