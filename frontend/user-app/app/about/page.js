// page.js

'use client'; // Directiva para marcar este archivo como cliente

import React, { useEffect, useState } from "react";

export default function About() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener usuarios desde el backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        const data = await response.json();
        setUsuarios(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para eliminar un usuario
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Si la eliminación es exitosa, actualiza el estado para eliminar el usuario de la lista
        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      } else {
        throw new Error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
  <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Usuarios registrados
    </h1>

    {/* Mostrar loading mientras se obtienen los usuarios */}
    {loading ? (
      <p className="text-center text-gray-700">Cargando usuarios...</p>
    ) : (
      <div>
        {usuarios.length === 0 ? (
          <p className="text-center text-gray-700">No hay usuarios registrados.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="px-6 py-3 text-left text-lg">Nombre</th>
                <th className="px-6 py-3 text-left text-lg">Apellido</th>
                <th className="px-6 py-3 text-left text-lg">Correo</th>
                <th className="px-6 py-3 text-left text-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr 
                  key={usuario.id} 
                  className="border-b border-gray-300 hover:bg-teal-200 cursor-pointer"
                >
                  <td className="px-6 py-4 text-gray-800">{usuario.firstName}</td>
                  <td className="px-6 py-4 text-gray-800">{usuario.lastName}</td>
                  <td className="px-6 py-4 text-gray-800">{usuario.email}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(usuario.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )}
  </div>
</div>
//kkk

  

  );
}
