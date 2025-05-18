// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Layout from './components/Layout';

// Pacientes
import Home from './pages/Home';
import AgendarCita from './pages/AgendarCita';
import MisCitas from './pages/MisCitas';
import HistorialClinico from './pages/HistorialClinico';

// Doctores
import DoctorHome from './pages/DoctorHome';               
import RegistrarConsulta from './pages/RegistrarConsulta';
import BuscarPaciente from './pages/BuscarPaciente';       

// Administradores
import AdminHome from './pages/AdminHome';
import GestionarPacientes from './pages/GestionarPacientes';
import GestionarDoctores from './pages/GestionarDoctores';
import GestionarUnidades from './pages/GestionarUnidades';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>   {/* make Layout explicit */}
          {/* Rutas para pacientes */}
          <Route path="/home" element={<Home />} />
          <Route path="/agendar" element={<AgendarCita />} />
          <Route path="/mis-citas" element={<MisCitas />} />
          <Route path="/historial" element={<HistorialClinico />} />

          {/* Rutas para doctores */}
          <Route path="/doctor-home" element={<DoctorHome />} />
          <Route path="/registrar-consulta" element={<RegistrarConsulta />} />
          <Route path="/buscar-paciente" element={<BuscarPaciente />} />

          {/* Rutas para administradores */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/pacientes" element={<GestionarPacientes />} />
          <Route path="/admin/doctores" element={<GestionarDoctores />} />
          <Route path="/admin/unidades" element={<GestionarUnidades />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}