// src/pages/AdminHome.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, getPacientes, getDoctores } from "../../api/usuarios.api";
import { getCitas, getConsultas } from "../../api/citas.api";
import { getUnidades, getUnidadesConDoctor } from "../../api/unidades.api";

export function AdminHome() {
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalPacientes: 0,
    totalDoctores: 0,
    totalCitas: 0,
    citasActivas: 0,
    totalConsultas: 0,
    totalUnidades: 0,
    unidadesEnUso: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          usuariosRes,
          pacientesRes,
          doctoresRes,
          citasRes,
          consultasRes,
          unidadesRes,
          unidadesEnUsoRes,
        ] = await Promise.all([
          getAllUsers(),
          getPacientes(),
          getDoctores(),
          getCitas(),
          getConsultas(),
          getUnidades(),
          getUnidadesConDoctor(),
        ]);

        const hoy = new Date();
        const citas = citasRes.data;
        const activas = citas.filter((cita) => {
          const fechaCita = new Date(cita.fecha_cita);
          return cita.estado === "agendada" && fechaCita >= hoy;
        });

        setStats({
          totalUsuarios: usuariosRes.data.length,
          totalPacientes: pacientesRes.data.length,
          totalDoctores: doctoresRes.data.length,
          totalCitas: citas.length,
          citasActivas: activas.length,
          totalConsultas: consultasRes.data.length,
          totalUnidades: unidadesRes.data.length,
          unidadesEnUso: unidadesEnUsoRes.data.length,
        });
      } catch (err) {
        console.error("Error cargando datos del administrador:", err);
        setError(
          "No se pudieron cargar los datos. Intenta recargar la página."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Cargando datos del panel administrativo...</p>
      </div>
    );

  if (error)
    return (
      <div className="container my-5 text-center text-danger">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center fw-bold">Panel de Administrador</h2>

      {/* Métricas */}
      <div className="row g-4 mb-5">
        {[
          {
            label: "Usuarios Totales",
            value: stats.totalUsuarios,
            color: "info",
          },
          { label: "Pacientes", value: stats.totalPacientes, color: "success" },
          { label: "Doctores", value: stats.totalDoctores, color: "primary" },
          { label: "Citas Totales", value: stats.totalCitas, color: "dark" },
          {
            label: "Citas en Curso",
            value: stats.citasActivas,
            color: "warning",
          },
          {
            label: "Consultas Totales",
            value: stats.totalConsultas,
            color: "secondary",
          },
        ].map(({ label, value, color }) => (
          <div className="col-12 col-md-4" key={label}>
            <div className={`card shadow-sm border-${color} h-100`}>
              <div className={`card-body text-center text-${color}`}>
                <h5 className="card-title">{label}</h5>
                <h2 className="display-5 fw-bold">{value}</h2>
              </div>
            </div>
          </div>
        ))}

        <div className="col-12 col-md-6 mx-auto">
          <div className="card shadow-sm border-info h-100 text-center">
            <div className="card-body">
              <h5 className="card-title text-info">Unidades en Uso</h5>
              <h2 className="display-5 fw-bold">
                {stats.unidadesEnUso} / {stats.totalUnidades}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Accesos directos */}
      <div className="row g-4">
        {[
          {
            label: "Pacientes",
            description: "Registrar, editar y eliminar pacientes afiliados.",
            to: "/admin/pacientes",
          },
          {
            label: "Doctores",
            description: "Registrar, editar y eliminar doctores.",
            to: "/admin/doctores",
          },
          {
            label: "Unidades",
            description: "Crear y administrar unidades médicas.",
            to: "/admin/unidades",
          },
        ].map(({ label, description, to }) => (
          <div className="col-12 col-md-4" key={label}>
            <div className="card h-100 text-center shadow-sm">
              <div className="card-body d-flex flex-column justify-content-center">
                <h5 className="card-title">{label}</h5>
                <p className="card-text">{description}</p>
                <Link to={to} className="btn btn-primary mt-auto">
                  Gestionar {label}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
