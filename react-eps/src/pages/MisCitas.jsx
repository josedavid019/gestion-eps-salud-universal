import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getCitasPorPaciente } from "../api/citas.api";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
      {citas.length === 0 ? (
        <p>No tienes citas registradas.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Unidad Médica</th>
              <th className="border px-4 py-2">Doctor</th>
              <th className="border px-4 py-2">Fecha</th>
              <th className="border px-4 py-2">Hora</th>
              <th className="border px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td className="border px-4 py-2">{cita.unidad}</td>
                <td className="border px-4 py-2">{cita.doctor}</td>
                <td className="border px-4 py-2">{cita.fecha}</td>
                <td className="border px-4 py-2">{cita.hora}</td>
                <td className="border px-4 py-2">{cita.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
