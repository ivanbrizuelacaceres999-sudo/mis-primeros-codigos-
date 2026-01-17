# Proyecto de clase – Inicio de sesión y lista de animales

Este proyecto corresponde a un trabajo práctico de clase que consiste en crear un **inicio de sesión** y una **lista de animales**, utilizando una **API REST desarrollada con Node.js** y una **base de datos MongoDB**.

La aplicación permite a los usuarios autenticarse y luego crear, listar y eliminar animales. El foco principal del proyecto está en el backend, la autenticación y la conexión con la base de datos.

---

## ⚙️ Funcionalidades

- API REST básica
- Inicio de sesión con usuario y contraseña
- Autenticación simple mediante JWT
- Listado, creación y eliminación de animales
- Conexión a base de datos MongoDB
- Separación de modelos y controladores
- Configuración mediante variables de entorno

---

## 🛠️ Tecnologías utilizadas

- Node.js  
- JavaScript  
- Express  
- MongoDB  
- Mongoose  

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio  
2. Instalar las dependencias:
   ```bash
   npm install
3.Crear un archivo .env en la raíz del proyecto con la siguiente configuración:

4.MONGO_URI=tu_uri_de_mongodb
SECRET=tu_clave_secreta 

5.node api.js

por si quieren crear su propio usuario control shit + i en la consola ponga 
fetch('/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@ejemplo.com',
    password: '123456'
  })
})
.then(res => res.text())
.then(token => console.log('TOKEN:', token))
.catch(err => console.error(err))





