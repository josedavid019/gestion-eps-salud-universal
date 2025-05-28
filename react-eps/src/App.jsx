// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Login } from "./pages/Login";
import { Registrar } from "./pages/Registrar";
import Layout from "./components/Layout";
import ProtectedRoutes from "./routes/ProtectedRoutes";

// Pacientes
import { Home } from "./pages/Home";
import AgendarCita from "./pages/AgendarCita";
import MisCitas from "./pages/MisCitas";
import HistorialClinico from "./pages/HistorialClinico";
import Profile from "./pages/Profile";

// Doctores
import DoctorHome from "./pages/DoctorHome";
import RegistrarConsulta from "./pages/RegistrarConsulta";
import BuscarPaciente from "./pages/BuscarPaciente";

// Administradores
import AdminHome from "./pages/AdminHome";
import GestionarPacientes from "./pages/GestionarPacientes";
import GestionarDoctores from "./pages/GestionarDoctores";
import GestionarUnidades from "./pages/GestionarUnidades";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />

        {/* Rutas protegidas para Pacientes */}
        <Route element={<ProtectedRoutes allowedRoles={["paciente"]} />}>
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="agendar" element={<AgendarCita />} />
            <Route path="mis-citas" element={<MisCitas />} />
            <Route path="historial" element={<HistorialClinico />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Rutas protegidas para Doctores */}
        <Route element={<ProtectedRoutes allowedRoles={["doctor"]} />}>
          <Route path="/doctor-home" element={<Layout />}>
            <Route index element={<DoctorHome />} />
            <Route path="registrar-consulta" element={<RegistrarConsulta />} />
            <Route path="buscar-paciente" element={<BuscarPaciente />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Rutas protegidas para Administradores */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<AdminHome />} />
            <Route path="pacientes" element={<GestionarPacientes />} />
            <Route path="doctores" element={<GestionarDoctores />} />
            <Route path="unidades" element={<GestionarUnidades />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
