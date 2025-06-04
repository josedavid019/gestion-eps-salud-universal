# 🏥 Gestion EPS Salud Universal

Este proyecto fue desarrollado como parte del curso **Ingeniería de Software**, aplicando la metodología ágil **Scrum**. El sistema de información está diseñado para gestionar eficientemente las actividades relacionadas con la atención en medicina externa de la EPS _Salud Universal_. Incluye funcionalidades para pacientes, doctores y personal administrativo.

## 👥 Integrantes del equipo

- Jose Angarita
- Stiven Amorocho
- Osvaldo Ospino
- Alex Diaz
- Jean Maldonado
- Andres Carrillo
- Jordy Cardenas

## 🛠️ Tecnologías utilizadas

- Frontend: React, JavaScript, Bootstrap
- Backend: Django, Python
- Base de datos: SQLite

## ⚙️ Instalación del Backend (Django + SQLite)

Este proyecto utiliza Django como backend, conectado a una base de datos SQLite. Sigue los pasos a continuación para instalar y ejecutar el backend localmente.

### 🖥️ Pasos para ejecutar el backend

#### Abrir una terminal de Git Bash

```bash
# 1. Ir al escritorio y crear la carpeta del proyecto
cd ~/Desktop
mkdir gestion-eps-salud-universal
cd gestion-eps-salud-universal/

# 2. Clonar el repositorio desde GitHub
git clone https://github.com/josedavid019/gestion-eps-salud-universal.git .

# 3. Instalar virtualenv (si no lo tienes)
pip install virtualenv

# 4. Crear y activar el entorno virtual
python -m venv venv
source venv/Scripts/activate

# 5. Instalar las dependencias del proyecto
pip install -r requirements.txt

# 6. Aplicar las migraciones a la base de datos
python manage.py makemigrations
python manage.py migrate

# 7. Iniciar el servidor de desarrollo
python manage.py runserver
```

## 🚀 Instalación del Frontend (React)

Este proyecto utiliza React como frontend.

### 🖥️ Pasos para ejecutar el frontend

#### Abrir una terminal de Git Bash

```bash
# 1. Abrir Git Bash y navegar a la carpeta del proyecto
cd ~/Desktop
cd gestion-eps-salud-universal/

# 2. (Opcional) Abrir el proyecto en VS Code
code .

# 3. Activar el entorno virtual
source venv/Scripts/activate

# 4. Entrar al directorio del frontend
cd react-eps/

# 5. Instalar las dependencias de Node.js
npm install

# 6. Ejecutar la aplicación en modo desarrollo
npm run dev
```

### 👥 Usuarios de prueba

#### Pacientes:

- Identificación: `1234567890`  
  Contraseña: `paciente123`

- Identificación: `123456789`  
  Contraseña: `paciente123`

#### Doctores:

- Identificación: `12345678`  
  Contraseña: `doctor123`

- Identificación: `1234567`  
  Contraseña: `doctor123`

#### Administrador:

- Identificación: `123456`  
  Contraseña: `admin123`

## Uso del sistema

- Recuerda entrar como admin a la parte de unidades y asignar una unidad a un doctor y otra a otro doctor.
- Luego podrás entrar como paciente para agendar citas.
- El paciente solo puede agendar una cita a la vez, hasta que se le atienda la cita o se pase la fecha de la cita.
- El doctor solo puede ver las citas asignadas en el dia para el, y puede hacer la consulta de la cita y mirar el historal de consultas.
- El administrador puede gestionar los pacientes, los doctores y las unidades.
