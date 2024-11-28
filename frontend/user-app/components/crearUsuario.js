"use client";
import React, { useState } from "react";
import Link from "next/link"; // Importa el componente Link para la navegación

function CrearUsuario() {
  // States
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [foto, setFoto] = 'hola';

  // HACER UNA PETICION POST PARA ENVIAR LOS DATOS EN UN JSON(ESPECIFICAMENTE EN EL BODY) Y SE ENVIAN A users.controllers
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(nombre, apellido, email, username, contrasena);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL; //saca la ruta del localhost del .env.local

      //estructura para hacer la llamada POST, 
      const response = await fetch(`${API_URL}/users`, { //aqui basicamenta esta diciendo saca del .env.local esto = http://localhost:8000/users que es el url para crear usuarios en POST
        method: 'POST', //tipo de motodo, en users.routes encuentras las rutas y el metodo que ocupa cada ruta
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, username, contrasena, foto }), //estos son los datos que estamos enviando, todos en un archivo JSON, que se lee en user.controllers como   (linea 18)   const {nombre, apellido, email, username, contrasena,foto} = req.body;

      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        console.log('Token recibido:', data.token);
        alert('Usuario creado exitosamente');
      }
    } catch (error) {
      console.log('Error al crear usuario:', error);
      //setError('Error al crear usuario. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Crear Usuario
        </h1>
        <form id="createUserForm" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            id="firstName"
            placeholder="Nombre"
            value={nombre} //guardamos lo que se escriba en la varibale
            onChange={(e) => setNombre(e.target.value)} //fucnion para guardar lo que se escriba set= definir
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            id="lastName"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="email"
            id="email"
            placeholder="Correo electrónico"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="password"
            id="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          
          <button
            type="submit"
            className="p-3 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition duration-300"
          >
            Crear Usuario
          </button>
        </form>

        {/* Botón para navegar a la página About */}
        <div className="mt-4">
          <Link href="/about">
            <button className="p-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300 w-full">
              Lista de usuarios
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;
