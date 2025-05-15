import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Rutas privadas con Navbar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/agendar" element={<div>Agendar Cita</div>} />
          <Route path="/mis-citas" element={<div>Mis Citas</div>} />
          <Route path="/historial" element={<div>Historial Clínico</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
