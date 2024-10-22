// src/MyComponents/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Errore nel recupero dei dati');
        }

        const data = await response.json();
        setUsers(data);
        console.log(data);

      } catch (error) {
        console.error('Errore durante il recupero degli utenti:', error);
        Swal.fire({
          title: 'Errore',
          text: 'Si è verificato un errore nel recupero dei dati degli utenti.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setLoading(false);
        console.log(users);

      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Surname</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Email</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.user_id}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.first_name}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.last_name}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
