import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Login } from "./pages/Login";
import { Registrar } from "./pages/Registrar";
import { Navbar } from "./components/Navbar";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./routes/ProtectedRoutes";

// Pacientes
import { Home } from "./pages/paciente/Home";
import { AgendarCita } from "./pages/paciente/AgendarCita";
import { MisCitas } from "./pages/paciente/MisCitas";

// Doctores
import { DoctorHome } from "./pages/doctor/DoctorHome";

// Administradores
import { AdminHome } from "./pages/admin/AdminHome";
import { GestionarPacientes } from "./pages/admin/GestionarPacientes";
import { GestionarDoctores } from "./pages/admin/GestionarDoctores";
import { GestionarUnidades } from "./pages/admin/GestionarUnidades";

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
        <Route element={<ProtectedRoute allowedRoles={["paciente"]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/agendar" element={<AgendarCita />} />
          <Route path="/home/mis-citas" element={<MisCitas />} />
          <Route path="/home/profile" element={<Profile />} />
        </Route>

        {/* Rutas protegidas para Doctores */}
        <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
          <Route path="/doctor" element={<DoctorHome />} />
          <Route path="/doctor/profile" element={<Profile />} />
        </Route>

        {/* Rutas protegidas para Administradores */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
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
