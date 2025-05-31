import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Login } from "./pages/Login";
import { Registrar } from "./pages/Registrar";
import { Navbar } from "./components/Navbar"; // Asegúrate de importar el Navbar
import ProtectedRoutes from "./routes/ProtectedRoutes";

// Pacientes
import { Home } from "./pages/Home";
import { AgendarCita } from "./components/AgendarCita";
import { MisCitas } from "./pages/MisCitas";
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
      <Navbar /> {/*Siempre visible */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />

        {/* Rutas protegidas para Pacientes */}
        <Route element={<ProtectedRoutes allowedRoles={["paciente"]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/agendar" element={<AgendarCita />} />
          <Route path="/home/mis-citas" element={<MisCitas />} />
          <Route path="/home/profile" element={<Profile />} />
        </Route>

        {/* Rutas protegidas para Doctores */}
        <Route element={<ProtectedRoutes allowedRoles={["doctor"]} />}>
          <Route path="/doctor-home" element={<DoctorHome />} />
          <Route
            path="/doctor-home/registrar-consulta"
            element={<RegistrarConsulta />}
          />
          <Route
            path="/doctor-home/buscar-paciente"
            element={<BuscarPaciente />}
          />
          <Route path="/doctor-home/profile" element={<Profile />} />
        </Route>

        {/* Rutas protegidas para Administradores */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/pacientes" element={<GestionarPacientes />} />
          <Route path="/admin/doctores" element={<GestionarDoctores />} />
          <Route path="/admin/unidades" element={<GestionarUnidades />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
