// src/pages/HistorialClinico.jsx
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function HistorialClinico({ pacienteId, isDoctorView }) {
  // Simulación de muchos registros
  const [historial] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      fecha: `2025-04-${String((i % 30) + 1).padStart(2,'0')}`,
      sintoma: `Síntoma ejemplo ${i + 1}`,
      tratamiento: `Tratamiento ejemplo ${i + 1}`
    }))
  );

  const perPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(historial.length / perPage);
  const currentData = historial.slice(currentPage * perPage, (currentPage + 1) * perPage);

  const [selected, setSelected] = useState(new Set());

  const toggleSelect = id => {
    setSelected(prev => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  const downloadSelectedPDF = () => {
    const doc = new jsPDF();
    doc.text('Historial Clínico Seleccionado', 14, 20);
    const body = historial
      .filter(item => selected.has(item.id))
      .map(item => [item.fecha, item.sintoma, item.tratamiento]);
    if (body.length === 0) {
      alert('Selecciona al menos un registro para descargar');
      return;
    }
    doc.autoTable({ head: [['Fecha', 'Síntoma', 'Tratamiento']], body });
    doc.save('historial_clinico_seleccionado.pdf');
  };

  const downloadAllPDF = () => {
    const doc = new jsPDF();
    doc.text('Historial Clínico Completo', 14, 20);
    const body = historial.map(item => [item.fecha, item.sintoma, item.tratamiento]);
    doc.autoTable({ head: [['Fecha', 'Síntoma', 'Tratamiento']], body });
    doc.save('historial_clinico_completo.pdf');
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between mb-3">
        <h5>Historial Clínico {isDoctorView ? '' : `(Paciente)`}</h5>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={downloadSelectedPDF}>
            Descargar Seleccionados
          </button>
          <button className="btn btn-outline-secondary me-2" onClick={downloadAllPDF}>
            Descargar Todo
          </button>
          <button className="btn btn-outline-secondary" onClick={() => window.print()}>
            Imprimir
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      onChange={e => {
                        setSelected(e.target.checked ? new Set(historial.map(i => i.id)) : new Set());
                      }}
                      checked={selected.size === historial.length}
                    />
                  </th>
                  <th>Fecha</th>
                  <th>Síntoma</th>
                  <th>Tratamiento</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map(item => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.has(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>
                    <td>{item.fecha}</td>
                    <td>{item.sintoma}</td>
                    <td>{item.tratamiento}</td>
                  </tr>
                ))}
                {historial.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-3">
                      No hay registros clínicos disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-outline-primary" onClick={() => setCurrentPage(p => Math.max(p - 1, 0))} disabled={currentPage === 0}>
            Anterior
          </button>
          <span>Página {currentPage + 1} de {pageCount}</span>
          <button className="btn btn-outline-primary" onClick={() => setCurrentPage(p => Math.min(p + 1, pageCount - 1))} disabled={currentPage === pageCount - 1}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}