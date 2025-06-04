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

# 3. Entrar al directorio del frontend
cd react-eps/

# 4. Instalar las dependencias de Node.js
npm install

# 5. Ejecutar la aplicación en modo desarrollo
npm run dev
```
