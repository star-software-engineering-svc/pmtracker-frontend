import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "tailwindcss/tailwind.css"

import './App.css';
import './styles/styles.css';

import { MainLayoutRoutes } from './view/layout/MainLayout';

function App() {
  return (
    <div>
      <MainLayoutRoutes />
    </div>
  );
}

export default App;
