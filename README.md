# Medical Prescriptions Frontend

Frontend desarrollado con Next.js + TypeScript + TailwindCSS para la gestión de prescripciones médicas.

---

## Tecnologías

- Next.js
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- Zustand
- Axios
- React Hook Form
- Recharts

---

## Características

- JWT Authentication
- Role Based Access Control (RBAC)
- Dashboard para Admin, Doctor y Patient
- Gestión de prescripciones médicas
- Filtros y paginación
- Descarga de PDFs
- Responsive Design
- Charts y métricas administrativas
- UX moderna con shadcn/ui

---

## Instalación

### 1. Clonar repositorio

```bash
git clone <repo-url>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env.local` con el siguiente contenido:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 4. Ejecutar proyecto

```bash
npm run dev
```

Aplicación disponible en `http://localhost:3001`

---

## Credenciales Demo

**Admin**
```json
{ "email": "admin@test.com", "password": "admin123" }
```

**Doctor**
```json
{ "email": "dr@test.com", "password": "doctor123" }
{ "email": "dr2@test.com", "password": "doctor456"}
```

**Patient**
```json
{ "email": "patient@test.com", "password": "patient123" }
{ "email": "patient2@test.com", "password": "patient456" }
```

---

## Arquitectura

```
src/
  app/
  components/
  hooks/
  lib/
  services/
  store/
  types/
```

---

## Dashboards

**Admin**
- Métricas generales
- Charts de prescripciones
- Estadísticas del sistema

**Doctor**
- Crear prescripciones
- Listar prescripciones
- Filtros y paginación

**Patient**
- Ver prescripciones
- Consumir prescripción
- Descargar PDF

---

## Responsive Design

La aplicación es totalmente responsive para Desktop, Tablet y Mobile.

---

## Autor

Prueba técnica desarrollada con Next.js + TypeScript.

---

## .env.example

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Backend

El backend debe ejecutarse localmente en:

http://localhost:3000