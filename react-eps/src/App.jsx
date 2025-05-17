// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Home from './pages/Home';
import AgendarCita from './pages/AgendarCita';
import MisCitas from './pages/MisCitas';
import HistorialClinico from './pages/HistorialClinico';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="agendar" element={<AgendarCita />} />
          <Route path="mis-citas" element={<MisCitas />} />
          <Route path="historial" element={<HistorialClinico />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
