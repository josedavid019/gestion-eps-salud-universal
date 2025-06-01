import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getDoctoresPorUnidad, getJornadaDoctor } from "../api/usuarios.api";
import { getUnidadesConDoctores } from "../api/unidades.api";
import {
  registrarCita,
  getFechasNoDisponibles,
  getHorasOcupadas,
} from "../api/citas.api";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // idioma español
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
  const [doctores, setDoctores] = useState([]);
  const [fechasNoDisponibles, setFechasNoDisponibles] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [jornada, setJornada] = useState(""); // "matinal" o "vespertina"
  const [horasOcupadas, setHorasOcupadas] = useState([]);

  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;
    setValue("doctor", doctorId);
    setValue("fecha_cita", null);
    setHorasOcupadas([]);
    setJornada("");

    if (!doctorId) return;

    try {
      const res = await getJornadaDoctor(doctorId);
      setJornada(res.data.jornada ? res.data.jornada.toLowerCase() : "");

      if (!res.data.jornada) {
        toast.error("Este doctor no tiene jornada asignada.");
      }
    } catch (err) {
      console.error("Error al obtener jornada:", err);
      toast.error("Error al obtener jornada del doctor");
    }
  };

  const handleUnidadChange = async (e) => {
    const unidadId = e.target.value;
    setValue("unidad", unidadId); // setear unidad manualmente
    try {
      const res = await getDoctoresPorUnidad(unidadId);
      setDoctores(res.data);
    } catch (error) {
      toast.error("Error al cargar doctores de esta unidad");
      setDoctores([]);
    }
  };

  const generarHoras = () => {
    const horas = [];
    const inicio = jornada === "matinal" ? 7 : 13; // 07:00 o 13:00
    const fin = inicio + 5; // 5 horas después

    for (let h = inicio; h < fin; h++) {
      horas.push(`${h.toString().padStart(2, "0")}:00`);
      horas.push(`${h.toString().padStart(2, "0")}:30`);
    }

    return horas.filter((hora) => !horasOcupadas.includes(hora));
  };

  useEffect(() => {
    async function fetchUnidades() {
      try {
        const res = await getUnidadesConDoctores();
        setUnidades(res.data);
      } catch (err) {
        toast.error("Error al cargar unidades médicas");
      }
    }

    const cargarFechasNoDisponibles = async () => {
      if (!watch("doctor")) return;

      try {
        const res = await getFechasNoDisponibles(watch("doctor"));
        setFechasNoDisponibles(res.data);
      } catch (err) {
        console.error("Error al obtener fechas no disponibles", err);
        setFechasNoDisponibles([]);
      }
    };

    async function fetchHorasOcupadas() {
      if (!watch("doctor") || !watch("fecha_cita")) return;

      try {
        const res = await getHorasOcupadas(
          watch("doctor"),
          watch("fecha_cita")
        );
        setHorasOcupadas(res.data); // formato: ["08:00", "08:30", ...]
      } catch (err) {
        toast.error("Error al obtener horas ocupadas");
      }
    }

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

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Agendar Cita</h2>
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

        {/* Doctor */}
        {doctores.length > 0 && (
          <div className="mb-3">
            <label htmlFor="doctor" className="form-label">
              Doctor
            </label>
            <select
              className="form-select"
              id="doctor"
              {...register("doctor", { required: "Seleccione un doctor" })}
              onChange={handleDoctorChange}
            >
              <option value="">Seleccione un doctor...</option>
              {doctores.map((d) => (
                <option key={d.usuario_id} value={d.usuario_id}>
                  Dr. {d.primer_nombre} {d.primer_apellido} ({d.especialidad})
                </option>
              ))}
            </select>
            {errors.doctor && (
              <span className="text-danger small">{errors.doctor.message}</span>
            )}
          </div>
        )}

        {/* Campos que solo se muestran si se eligió unidad y doctor */}
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
    </div>
  );
}
