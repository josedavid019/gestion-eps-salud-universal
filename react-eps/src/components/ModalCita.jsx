import React, { useState, useEffect } from "react";
import { Modal, Tab, Nav, Button, Form, Accordion } from "react-bootstrap";
import { format } from "date-fns";
import {
  registrarConsulta,
  actualizarCita,
  actualizarConsulta,
  getConsultasPorPaciente,
} from "../api/citas.api";

export function ModalCita({
  cita,
  show,
  handleClose,
  refetchCitas,
  consultaExistente,
}) {
  const [key, setKey] = useState("consulta");

  // Estados del formulario
  const [estado, setEstado] = useState("atendida" || cita.estado);
  const [sintomas, setSintomas] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [historialConsultas, setHistorialConsultas] = useState([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(false);
  const fechaAtencion = format(new Date(), "yyyy-MM-dd");

  // Actualizar solo el estado de la cita
  const handleActualizarEstado = async () => {
    try {
      await actualizarCita(cita.cita_id, { estado });
      alert("Estado de la cita actualizado con éxito");

      if (refetchCitas) {
        await refetchCitas();
      }

      handleClose();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Error al actualizar el estado de la cita");
    }
  };

  // Registrar la consulta y actualizar el estado a "atendida"
  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      fecha_atencion: fechaAtencion,
      sintomas,
      tratamiento,
      recomendaciones,
    };

    try {
      if (consultaExistente) {
        await actualizarConsulta(consultaExistente.consulta_id, datos);
      } else {
        await registrarConsulta({ ...datos, cita: cita.cita_id });
      }

      await actualizarCita(cita.cita_id, { estado: "atendida" });
      setEstado("atendida");
      alert("Consulta registrada y estado actualizado a 'atendida'");
      if (refetchCitas) {
        await refetchCitas();
      }
      handleClose();
    } catch (error) {
      console.error("Error al registrar consulta o actualizar estado:", error);
      alert("Hubo un error al registrar la consulta o actualizar el estado.");
    }
  };

  useEffect(() => {
    const cargarHistorial = async () => {
      if (cita?.usuario?.usuario_id) {
        setCargandoHistorial(true);
        try {
          const response = await getConsultasPorPaciente(
            cita.usuario.usuario_id
          );
          setHistorialConsultas(response.data);
        } catch (error) {
          console.error("Error al cargar historial:", error);
          setHistorialConsultas([]);
        } finally {
          setCargandoHistorial(false);
        }
      }
    };

    cargarHistorial();

    if (consultaExistente) {
      setSintomas(consultaExistente.sintomas || "");
      setTratamiento(consultaExistente.tratamiento || "");
      setRecomendaciones(consultaExistente.recomendaciones || "");
    } else {
      setSintomas("");
      setTratamiento("");
      setRecomendaciones("");
    }

    setEstado(cita.estado || "agendada");
  }, [consultaExistente, cita]);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Cita con {cita.usuario.primer_nombre} {cita.usuario.primer_apellido}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="consulta">Registrar Consulta</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="historial">Historial Paciente</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className="mt-3">
            <Tab.Pane eventKey="consulta">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Estado de la Cita</Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Select
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      <option value="agendada">Agendada</option>
                      <option value="atendida">Atendida</option>
                      <option value="no_atendida">No Atendida</option>
                    </Form.Select>
                    <Button
                      variant="outline-primary"
                      onClick={handleActualizarEstado}
                      type="button"
                    >
                      Actualizar Estado
                    </Button>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Síntomas</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tratamiento</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={tratamiento}
                    onChange={(e) => setTratamiento(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Recomendaciones</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={recomendaciones}
                    onChange={(e) => setRecomendaciones(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Atención</Form.Label>
                  <Form.Control type="date" value={fechaAtencion} disabled />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Guardar Consulta
                </Button>
              </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="historial">
              <h5>Historial del Paciente</h5>
              {cargandoHistorial ? (
                <p>Cargando historial...</p>
              ) : historialConsultas.length === 0 ? (
                <p>No hay consultas registradas para este paciente.</p>
              ) : (
                <Accordion alwaysOpen>
                  {historialConsultas.map((consulta, index) => (
                    <Accordion.Item
                      eventKey={String(index)}
                      key={consulta.consulta_id}
                    >
                      <Accordion.Header>
                        Consulta del {consulta.fecha_atencion}
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          <strong>Síntomas:</strong> {consulta.sintomas}
                        </p>
                        <p>
                          <strong>Tratamiento:</strong> {consulta.tratamiento}
                        </p>
                        <p>
                          <strong>Recomendaciones:</strong>{" "}
                          {consulta.recomendaciones}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
