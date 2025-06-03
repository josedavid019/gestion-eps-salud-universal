// src/pages/AdminHome.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, getPacientes, getDoctores } from "../../api/usuarios.api";
import { getCitas, getConsultas } from "../../api/citas.api";
import { getUnidades, getUnidadesConDoctor } from "../../api/unidades.api";

export function AdminHome() {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalPacientes, setTotalPacientes] = useState(0);
  const [totalDoctores, setTotalDoctores] = useState(0);
  const [totalCitas, setTotalCitas] = useState(0);
  const [citasActivas, setCitasActivas] = useState(0);
  const [totalConsultas, setTotalConsultas] = useState(0);
  const [totalUnidades, setTotalUnidades] = useState(0);
  const [unidadesEnUso, setUnidadesEnUso] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosRes = await getAllUsers();
        const pacientesRes = await getPacientes();
        const doctoresRes = await getDoctores();
        const citasRes = await getCitas();
        const consultasRes = await getConsultas();
        const unidadesRes = await getUnidades();
        const unidadesEnUsoRes = await getUnidadesConDoctor();

        const citas = citasRes.data;

        const hoy = new Date();
        const activas = citas.filter((cita) => {
          const fechaCita = new Date(cita.fecha_cita);
          return cita.estado === "agendada" && fechaCita >= hoy;
        });

        setTotalUsuarios(usuariosRes.data.length);
        setTotalPacientes(pacientesRes.data.length);
        setTotalDoctores(doctoresRes.data.length);
        setTotalCitas(citas.length);
        setCitasActivas(activas.length);
        setTotalConsultas(consultasRes.data.length);
        setTotalUnidades(unidadesRes.data.length);
        setUnidadesEnUso(unidadesEnUsoRes.data.length);
      } catch (error) {
        console.error("Error cargando datos del administrador:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Panel de Administrador</h2>

      {/* Sección de métricas */}
      <div className="row g-4 mb-5">
        {/* Usuarios Totales */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-info">
            <div className="card-body text-center">
              <h5 className="card-title text-info">Usuarios Totales</h5>
              <h2 className="display-6 fw-bold">{totalUsuarios}</h2>
            </div>
          </div>
        </div>

        {/* Pacientes */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-success">
            <div className="card-body text-center">
              <h5 className="card-title text-success">Pacientes</h5>
              <h2 className="display-6 fw-bold">{totalPacientes}</h2>
            </div>
          </div>
        </div>

        {/* Doctores */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-primary">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">Doctores</h5>
              <h2 className="display-6 fw-bold">{totalDoctores}</h2>
            </div>
          </div>
        </div>

        {/* Citas Totales */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-dark">
            <div className="card-body text-center">
              <h5 className="card-title text-dark">Citas Totales</h5>
              <h2 className="display-6 fw-bold">{totalCitas}</h2>
            </div>
          </div>
        </div>

        {/* Citas en Curso */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-warning">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">Citas en Curso</h5>
              <h2 className="display-6 fw-bold">{citasActivas}</h2>
            </div>
          </div>
        </div>

        {/* Consultas Totales */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm border-secondary">
            <div className="card-body text-center">
              <h5 className="card-title text-secondary">Consultas Totales</h5>
              <h2 className="display-6 fw-bold">{totalConsultas}</h2>
            </div>
          </div>
        </div>

        {/* Unidades en Uso */}
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-6">
            <div className="card shadow-sm border-info text-center">
              <div className="card-body">
                <h5 className="card-title text-info">Unidades en Uso</h5>
                <h2 className="display-6 fw-bold">
                  {unidadesEnUso} / {totalUnidades}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accesos directos */}
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Pacientes</h5>
              <p className="card-text">
                Registrar, editar y eliminar pacientes afiliados.
              </p>
              <Link to="/admin/pacientes" className="btn btn-primary mt-auto">
                Gestionar Pacientes
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Doctores</h5>
              <p className="card-text">
                Registrar, editar y eliminar doctores.
              </p>
              <Link to="/admin/doctores" className="btn btn-primary mt-auto">
                Gestionar Doctores
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Unidades</h5>
              <p className="card-text">Crear y administrar unidades médicas.</p>
              <Link to="/admin/unidades" className="btn btn-primary mt-auto">
                Gestionar Unidades
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
