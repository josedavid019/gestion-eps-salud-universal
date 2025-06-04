import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../utils/toastConfig";
import { useAuth } from "../../context/AuthContext";
import { getDoctorPorUnidad, getJornadaDoctor } from "../../api/usuarios.api";
import { getUnidadesConDoctor } from "../../api/unidades.api";
import {
  registrarCita,
  getFechasNoDisponibles,
  getHorasOcupadas,
  getCitasPorPaciente,
} from "../../api/citas.api";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

export function AgendarCita() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();
  const [unidades, setUnidades] = useState([]);
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [jornada, setJornada] = useState("");
  const [doctorAsignado, setDoctorAsignado] = useState(null);
  const [puedeAgendar, setPuedeAgendar] = useState(null);
  const [motivoBloqueo, setMotivoBloqueo] = useState("");

  const handleUnidadChange = async (e) => {
    const unidadSeleccionada = e.target.value;
    setValue("unidad", unidadSeleccionada);
    setValue("fecha_cita", null);
    setHorasOcupadas([]);
    setJornada("");

    try {
      const response = await getDoctorPorUnidad(unidadSeleccionada);
      const doctor = response.data;
      setDoctorAsignado(doctor);

      if (doctor?.usuario_id) {
        setValue("doctor", doctor.usuario_id); // Asignar automáticamente
        const res = await getJornadaDoctor(doctor.usuario_id);
        setJornada(res.data.jornada ? res.data.jornada.toLowerCase() : "");

        if (!res.data.jornada) {
          errorToast("Este doctor no tiene jornada asignada.");
        }
      }
    } catch (error) {
      console.error("No se encontró doctor para esta unidad:", error);
      setDoctorAsignado(null);
      setValue("doctor", null);
      setJornada("");
      errorToast("No hay doctor asignado a esta unidad médica.");
    }
  };

  const generarHoras = () => {
    if (!jornada) return [];
    const inicio = jornada === "matinal" ? 7 : 13;
    const horas = [];

    for (let h = inicio; h < inicio + 5; h++) {
      ["00", "30"].forEach((m) => {
        const hora = `${h.toString().padStart(2, "0")}:${m}`;
        if (!horasOcupadas.includes(hora)) horas.push(hora);
      });
    }

    return horas;
  };

  const validarCitas = async () => {
    try {
      const res = await getCitasPorPaciente(user.usuario_id); // endpoint personalizado
      const citas = res.data;

      const ahora = new Date();

      const citaVigente = citas.find((cita) => {
        if (cita.estado !== "agendada") return false;

        const fechaCita = new Date(`${cita.fecha_cita}T${cita.hora_cita}`);
        return fechaCita >= ahora;
      });

      if (citaVigente) {
        setPuedeAgendar(false);
        setMotivoBloqueo(
          "Ya tienes una cita agendada y aún no ha ocurrido. Debes esperar a que se atienda para agendar una nueva."
        );
      } else {
        setPuedeAgendar(true);
      }
    } catch (error) {
      errorToast("Error al validar citas");
      setPuedeAgendar(false);
      setMotivoBloqueo("Error al validar tus citas. Intenta más tarde.");
    }
  };

  async function fetchUnidades() {
    try {
      const res = await getUnidadesConDoctor();
      setUnidades(res.data);
    } catch (err) {
      errorToast("Error al cargar unidades médicas");
    }
  }

  async function cargarFechasNoDisponibles() {
    if (!watch("doctor")) return;

    try {
      const res = await getFechasNoDisponibles(watch("doctor"));
      setFechasNoDisponibles(res.data);
    } catch (err) {
      errorToast("Error al obtener fechas no disponibles");
      setFechasNoDisponibles([]);
    }
  }

  async function fetchHorasOcupadas() {
    if (!watch("doctor") || !watch("fecha_cita")) return;

    try {
      const res = await getHorasOcupadas(watch("doctor"), watch("fecha_cita"));
      setHorasOcupadas(res.data);
    } catch (err) {
      errorToast("Error al obtener horas ocupadas");
    }
  }

  useEffect(() => {
    validarCitas();
    fetchUnidades();
  }, []);

  useEffect(() => {
    cargarFechasNoDisponibles();
  }, [watch("doctor")]);

  useEffect(() => {
    fetchHorasOcupadas();
  }, [watch("doctor"), watch("fecha_cita")]);

  const onSubmit = async (data) => {
    try {
      const cita = {
        ...data,
        usuario: user.usuario_id,
        estado: "agendada",
        fecha_cita: data.fecha_cita.toISOString().split("T")[0],
      };
      await registrarCita(cita);
      successToast("Cita agendada correctamente");
      reset();
      navigate("/home");
    } catch (err) {
      errorToast("Error al agendar cita");
      console.error(err);
    }
  };

  const isDiaValido = (date) => {
    const hoy = new Date();
    const fechaSeleccionada = new Date(date);

    const esMismoDia = hoy.toDateString() === fechaSeleccionada.toDateString();

    const horaActual = hoy.getHours();

    // Si es jornada matinal y ya pasó el mediodía, no puede agendar para hoy
    if (jornada === "matinal") {
      if (horaActual < 12) {
        // Puede agendar hoy por la tarde (la jornada ya lo validará en horas)
        return true;
      } else {
        // Solo puede agendar para mañana en adelante
        return !esMismoDia;
      }
    }

    // Si es jornada vespertina, solo puede agendar desde mañana
    if (jornada === "vespertina") {
      return !esMismoDia;
    }

    // Por defecto, permitir
    return true;
  };

  const renderError = (field) =>
    errors[field] && (
      <div className="text-danger small">{errors[field].message}</div>
    );

  return (
    <div
      className="container mt-5 p-4 bg-white rounded-4 shadow-lg border"
      style={{ maxWidth: "750px" }}
    >
      <h2 className="text-center mb-4 fw-bold text-primary">
        <i className="bi bi-calendar-check me-2" />
        Agendar Cita Médica
      </h2>

      {puedeAgendar === false && (
        <div className="alert alert-warning text-center fw-semibold">
          {motivoBloqueo}
        </div>
      )}

      {puedeAgendar === null && (
        <div className="text-center text-muted my-4">
          <i className="bi bi-hourglass-split me-2" />
          Verificando disponibilidad...
        </div>
      )}

      {puedeAgendar && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Datos del paciente */}
          <div className="mb-4 border-start border-4 ps-3 border-primary-subtle">
            <h5 className="mb-3 text-primary">👤 Datos del Paciente</h5>
            <div className="mb-2">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={user.nombres}
                disabled
              />
            </div>
            <div className="mb-2">
              <label className="form-label fw-semibold">Identificación</label>
              <input
                type="text"
                className="form-control"
                value={user.identificacion}
                disabled
              />
            </div>
          </div>

          {/* Unidad médica */}
          <div className="mb-3">
            <label className="form-label fw-semibold">🏥 Unidad Médica</label>
            <select
              className="form-select"
              {...register("unidad", {
                required: "Seleccione una unidad médica",
              })}
              onChange={handleUnidadChange}
            >
              <option value="">Seleccione una unidad...</option>
              {unidades.map((u) => (
                <option key={u.unidad_id} value={u.unidad_id}>
                  {u.nombre} - Planta {u.planta}
                </option>
              ))}
            </select>
            {renderError("unidad")}
          </div>

          {/* Doctor asignado */}
          {doctorAsignado && (
            <div className="mb-3">
              <label className="form-label fw-semibold">
                👨‍⚕️ Doctor Asignado
              </label>
              <input
                type="text"
                className="form-control bg-light"
                value={`Dr. ${doctorAsignado.primer_nombre} ${doctorAsignado.primer_apellido} (${doctorAsignado.especialidad})`}
                disabled
              />
            </div>
          )}

          {/* Campos condicionales */}
          {watch("unidad") && watch("doctor") && (
            <>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  📅 Fecha de la Cita
                </label>
                <Controller
                  control={control}
                  name="fecha_cita"
                  rules={{ required: "Fecha requerida" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      locale="es"
                      className="form-control w-100" // ¡Aquí forzamos a que se comporte como input normal!
                      wrapperClassName="w-100" // Asegura que el wrapper no lo alinee al lado
                      placeholderText="Selecciona una fecha"
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      excludeDates={fechasNoDisponibles.map((f) => new Date(f))}
                      filterDate={isDiaValido}
                    />
                  )}
                />
                {renderError("fecha_cita")}
              </div>

              {/* Hora */}
              {jornada &&
                watch("fecha_cita") &&
                generarHoras().length === 0 && (
                  <div className="alert alert-info">
                    No hay horas disponibles para esta fecha.
                  </div>
                )}
              {jornada && watch("fecha_cita") && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    🕒 Hora de la Cita
                  </label>
                  <select
                    className="form-select"
                    {...register("hora_cita", { required: "Hora requerida" })}
                  >
                    <option value="">Seleccione una hora...</option>
                    {generarHoras().map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                  {renderError("hora_cita")}
                </div>
              )}

              {/* Motivo */}
              <div className="mb-3">
                <label className="form-label fw-semibold">📋 Motivo</label>
                <textarea
                  className="form-control"
                  rows="3"
                  {...register("motivo", { required: "Motivo requerido" })}
                />
                {renderError("motivo")}
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fs-5 shadow-sm"
          >
            <i className="bi bi-calendar-plus me-2" />
            Agendar Cita
          </button>
        </form>
      )}
    </div>
  );
}
