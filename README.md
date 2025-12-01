📦 **Descargar APK firmado (Drive):**
[Abrir en Google Drive](https://drive.google.com/file/d/14IQNin-0Lvc03enTyOeepZUWYXzdMRTD/view?usp=sharing)

# 🎓 My Tutor App

Aplicación móvil desarrollada con **Ionic + React + Capacitor**, que conecta estudiantes con tutores de distintas carreras.  
Incluye **autenticación**, **persistencia de sesión**, **consumo de API externa**, **base de datos local**, y **acceso nativo a correo electrónico**.

---

## 🧠 Descripción General

**My Tutor App** permite a los usuarios:
- Ver tutores disponibles con su carrera, modalidad, precio y reputación.  
- Marcar tutores como favoritos (almacenados en la base de datos local con IndexedDB).  
- Consultar una lista de usuarios obtenida desde una **API externa** (Typicode JSONPlaceholder).  
- Mantener la sesión iniciada usando **Capacitor Preferences**.  
- Enviar correos nativos desde el dispositivo al tutor seleccionado.  
- Probar la app en Android mediante un **APK firmado**.

---

## 🧩 Tecnologías Utilizadas

- **Ionic Framework**  
- **React (TypeScript)**  
- **Capacitor** (para acceder a funcionalidades nativas)  
- **IndexedDB** (para almacenamiento local)  
- **Typicode JSON API** (para consumo externo)  
- **Vitest + Testing Library** (para pruebas unitarias)  

---

## ⚙️ Instalación y Ejecución en Localhost

Para ejecutar la aplicación localmente:

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor local
ionic serve
