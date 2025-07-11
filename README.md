
# 💻 SPA de Registro de Usuarios con Vite + JSON Server

Una **Single Page Application (SPA)** moderna que permite registrar, editar, eliminar y visualizar usuarios de manera dinámica. Construida con **Vite** para el frontend y **JSON Server** como backend simulado.

---

## 🌟 Características

- 🔐 Login visual centrado (usuario: `Admin`, contraseña: `1234`)
- 📋 Registro de usuarios con:
  - Nombre completo
  - Email
  - Teléfono
  - Número de matrícula
  - Fecha de ingreso
- 🧠 Validaciones de datos y prevención de duplicados
- 🔍 Buscador en tiempo real
- ♻️ Funciones CRUD completas (crear, leer, actualizar, eliminar)
- 🖼️ Avatar predeterminado por usuario
- 📱 Diseño responsive y moderno

---

## 📁 Estructura del Proyecto

```
mi-spa-vite/
├── index.html
├── package.json
├── vite.config.js
├── db.json
├── /src/
│   ├── main.js
│   ├── app.js
|   ├── auth.js
│   └── style.css
└── /public/
    └── imgs/
        ├── ImgProfile.jpg
        └── Incognito.jpeg
```

---

## 🚀 Instalación y Uso

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/MaxterDuck/Reto-SPA-Vite.git
cd Reto-SPA-Vite
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Iniciar el servidor de datos JSON

```bash
npm run server
```

🟢 Servidor corriendo en: [http://localhost:3000/users](http://localhost:3000/users)

### 4️⃣ Iniciar la aplicación con Vite

```bash
npm run dev
```

🟣 Frontend corriendo en: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Credenciales de Acceso

| Usuario | Contraseña |
|---------|------------|
| Admin   | 1234       |
| NewUser | *Contraseña*|
---

## 🧪 Scripts Disponibles

| Comando         | Descripción                                      |
|-----------------|--------------------------------------------------|
| `npm run dev`   | Inicia Vite para desarrollo del frontend         |
| `npm run server`| Inicia JSON Server para simular la base de datos |
| `node reset.js` | Resetea La base de datos. |

---

## 🧾 Estructura de la Base de Datos (db.json)

```json
{
  "users": [
    {
      "id": 1,
      "username": "Admin",
      "password": "1234",
      "name": "Tomas Restrepo",
      "email": "tomas@example.com",
      "phone": "3123456789",
      "enrollNumber": "12345678901234",
      "dateOfAdmission": "2024-07-01",
      "role": "admin"
    }
```

---

## 🧠 Tecnologías Utilizadas

- ⚡ Vite
- 📦 JSON Server
- 🎨 CSS personalizado (sin frameworks)
- 🧹 JavaScript Vanilla (puro)

---

## 👨‍💻 Autor

**Tomas Restrepo**  
Proyecto creado como práctica de desarrollo web moderno con enfoque en SPA, Vite y herramientas ligeras.

---

