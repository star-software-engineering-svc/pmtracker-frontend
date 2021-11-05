import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "tailwindcss/tailwind.css"

import './App.css';
import './styles/styles.css';

import { MainLayoutRoutes } from './view/layout/MainLayout';

function App() {
  console.log('App');
  return (
    <div>
      <MainLayoutRoutes />
    </div>
  );
}

export default App;
