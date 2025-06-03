import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
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
          toast.error("Este doctor no tiene jornada asignada.");
        }
      }
    } catch (error) {
      console.error("No se encontró doctor para esta unidad:", error);
      setDoctorAsignado(null);
      setValue("doctor", null);
      setJornada("");
      toast.error("No hay doctor asignado a esta unidad médica.");
    }
  };

  const generarHoras = () => {
    const horas = [];
    const inicio = jornada === "matinal" ? 7 : 13;
    const fin = inicio + 5;

    for (let h = inicio; h < fin; h++) {
      horas.push(`${h.toString().padStart(2, "0")}:00`);
      horas.push(`${h.toString().padStart(2, "0")}:30`);
    }

    return horas.filter((hora) => !horasOcupadas.includes(hora));
  };

  useEffect(() => {
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
        console.error("Error al validar citas", error);
        setPuedeAgendar(false);
        setMotivoBloqueo("Error al validar tus citas. Intenta más tarde.");
      }
    };

    async function fetchUnidades() {
      try {
        const res = await getUnidadesConDoctor();
        setUnidades(res.data);
      } catch (err) {
        toast.error("Error al cargar unidades médicas");
      }
    }

    async function cargarFechasNoDisponibles() {
      if (!watch("doctor")) return;

      try {
        const res = await getFechasNoDisponibles(watch("doctor"));
        setFechasNoDisponibles(res.data);
      } catch (err) {
        console.error("Error al obtener fechas no disponibles", err);
        setFechasNoDisponibles([]);
      }
    }

    async function fetchHorasOcupadas() {
      if (!watch("doctor") || !watch("fecha_cita")) return;

      try {
        const res = await getHorasOcupadas(
          watch("doctor"),
          watch("fecha_cita")
        );
        setHorasOcupadas(res.data);
      } catch (err) {
        toast.error("Error al obtener horas ocupadas");
      }
    }

    validarCitas();
    fetchUnidades();
    cargarFechasNoDisponibles();
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
      toast.success("Cita agendada correctamente");
      reset();
      navigate("/home");
    } catch (err) {
      toast.error("Error al agendar cita");
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

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Agendar Cita</h2>
      {puedeAgendar === false && (
        <div className="alert alert-warning text-center my-4">
          {motivoBloqueo}
        </div>
      )}

      {puedeAgendar === null && (
        <div className="text-center my-4">Verificando disponibilidad...</div>
      )}
      {puedeAgendar && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Datos del paciente */}
          <div className="mb-3">
            <label className="form-label">Nombre del paciente</label>
            <input
              type="text"
              className="form-control"
              value={user.nombres}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Identificación</label>
            <input
              type="text"
              className="form-control"
              value={user.identificacion}
              disabled
            />
          </div>

          {/* Unidad médica */}
          <div className="mb-3">
            <label htmlFor="unidad" className="form-label">
              Unidad Médica
            </label>
            <select
              className="form-select"
              id="unidad"
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
          </div>

          {/* Doctor asignado (texto informativo) */}
          {doctorAsignado && (
            <div className="mb-3">
              <label className="form-label">Doctor asignado</label>
              <input
                type="text"
                className="form-control"
                value={`Dr. ${doctorAsignado.primer_nombre} ${doctorAsignado.primer_apellido} (${doctorAsignado.especialidad})`}
                disabled
              />
            </div>
          )}

          {/* Campos que solo se muestran si hay unidad y doctor asignado */}
          {watch("unidad") && watch("doctor") && (
            <>
              {/* Fecha */}
              <div className="mb-3">
                <label className="form-label">Fecha de la cita</label>
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
                      className="form-control"
                      placeholderText="Selecciona una fecha"
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      excludeDates={fechasNoDisponibles.map((f) => new Date(f))}
                      filterDate={isDiaValido}
                    />
                  )}
                />
                {errors.fecha_cita && (
                  <span className="text-danger small">
                    {errors.fecha_cita.message}
                  </span>
                )}
              </div>

              {/* Hora */}
              {jornada && watch("fecha_cita") && (
                <div className="mb-3">
                  <label htmlFor="hora_cita" className="form-label">
                    Hora de la cita
                  </label>
                  <select
                    className="form-select"
                    id="hora_cita"
                    {...register("hora_cita", { required: "Hora requerida" })}
                  >
                    <option value="">Seleccione una hora...</option>
                    {generarHoras().map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                  {errors.hora_cita && (
                    <span className="text-danger small">
                      {errors.hora_cita.message}
                    </span>
                  )}
                </div>
              )}

              {/* Motivo */}
              <div className="mb-3">
                <label htmlFor="motivo" className="form-label">
                  Motivo
                </label>
                <textarea
                  className="form-control"
                  id="motivo"
                  rows="3"
                  {...register("motivo", {
                    required: "Motivo requerido",
                  })}
                />
                {errors.motivo && (
                  <span className="text-danger small">
                    {errors.motivo.message}
                  </span>
                )}
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-5">
            Agendar Cita
          </button>
        </form>
      )}
    </div>
  );
}
