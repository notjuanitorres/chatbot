<<<<<<< HEAD
# chatbot
=======
# 🤖 Chatbot IA – FastAPI + OpenAI + React + Tailwind

Proyecto **full-stack educativo** que integra un **backend en FastAPI** (Python) con la **API de OpenAI** y un **frontend en React + Tailwind**.  
El objetivo es construir un chatbot funcional que pueda consultarse desde una interfaz web moderna, aplicando **buenas prácticas de arquitectura, tipado y separación de responsabilidades**.

---

## 🧩 Tecnologías principales

| Capa | Tecnología | Descripción |
|------|-------------|-------------|
| 🖥️ **Backend** | [FastAPI](https://fastapi.tiangolo.com/) | Framework Python asincrónico para servicios REST. |
|  | [Pydantic](https://docs.pydantic.dev/) | Validación y serialización de datos. |
|  | [OpenAI API](https://platform.openai.com/docs) | Generación de respuestas con modelos GPT. |
|  | [Structlog](https://www.structlog.org/) | Logging estructurado y trazable. |
| 💬 **Frontend** | [React + TypeScript](https://react.dev/) | Interfaz modular y reactiva. |
|  | [Vite](https://vitejs.dev/) | Bundler rápido para desarrollo moderno. |
|  | [TailwindCSS](https://tailwindcss.com/) | Estilos utilitarios, responsive y accesibles. |
|  | [Axios](https://axios-http.com/) | Cliente HTTP centralizado. |

---

## 🚀 Ejecución local

### 🔹 1. Backend (FastAPI)

```bash
cd api-chat
python -m venv .venv
source .venv/bin/activate       # En macOS/Linux
# o .venv\Scripts\activate      # En Windows

pip install -e .
cp .env.example .env
# Agregar tu clave real de OpenAI (sk-xxxxx)
uvicorn app.main:app --reload
```

📍 API disponible en:  
👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### 🔹 2. Frontend (React + Vite)

```bash
cd web-chat
npm install
cp .env.example .env
# Asegurarse de que VITE_API_BASE apunte al backend local:
# VITE_API_BASE=http://127.0.0.1:8000/api/v1
npm run dev
```

🌐 Frontend disponible en:  
👉 [http://127.0.0.1:5173](http://127.0.0.1:5173)

---

## 🔐 Variables de entorno

### Backend (`api-chat/.env.example`)
```
OPENAI_API_KEY=sk-xxxxx
OPENAI_MODEL=gpt-4o
API_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
ENV=dev
```

### Frontend (`web-chat/.env.example`)
```
VITE_API_BASE=http://127.0.0.1:8000/api/v1
```

---

## ✅ Buenas prácticas aplicadas

- Separación estricta entre frontend y backend.  
- Validaciones con Pydantic y tipado completo TypeScript.  
- Logging estructurado (JSON) con `structlog`.  
- Configuración desacoplada vía `.env` y `.env.example`.  
- Manejo de errores y CORS.  
- Estilos consistentes y responsivos con Tailwind.  
- Arquitectura limpia (servicios, esquemas, rutas).  

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia **MIT**.  
Podés usarlo, modificarlo y mejorarlo libremente.

---

> _“Cada línea de código es una oportunidad para enseñar, automatizar y construir confianza.”_
>>>>>>> bf5ce39 (upload project)
