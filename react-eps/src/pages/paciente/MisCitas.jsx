import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCitasPorPaciente } from "../../api/citas.api";

export function MisCitas() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (!user || !user.usuario_id) return;

    getCitasPorPaciente(user.usuario_id)
      .then(({ data }) => {
        const citasFormateadas = data.map((cita) => ({
          id: cita.cita_id || cita.id,
          unidad: cita.unidad?.nombre || `Unidad ${cita.unidad}`,
          doctor: cita.doctor
            ? `${cita.doctor.primer_nombre} ${cita.doctor.primer_apellido}`
            : `Doctor ${cita.doctor}`,
          fecha: cita.fecha_cita,
          hora: cita.hora_cita,
          estado: cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1),
        }));

        setCitas(citasFormateadas);
      })
      .catch((error) => {
        console.error("Error al obtener citas:", error);
      });
  }, [user]);

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold text-primary">Mis Citas</h2>

      {citas.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No tienes citas registradas.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Unidad Médica</th>
                <th>Doctor</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.unidad}</td>
                  <td>{cita.doctor}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>{cita.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
