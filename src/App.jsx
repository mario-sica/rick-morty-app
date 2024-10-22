// src/App.js
import { StrictMode } from "react";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Swal from 'sweetalert2';
import "./App.css";
import { Dashboard } from "./MyComponents/Dashboard";
import { LandingPage } from "./MyComponents/LandingPage";
import { MyProfile } from "./MyComponents/MyProfile";
import { UniverseStats } from "./MyComponents/UniverseStats";
import Users from "./MyComponents/Users";

function checkIfUserNotLogged() {
  if (!localStorage.getItem('token')) {
    return redirect('/landing-page');
  }
  return null;
}

async function checkIfUserIsAdmin() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role_id !== 2) {
    await Swal.fire({
      title: 'Accesso negato, plebeo!',
      text: 'Ma chi ti credi di essere, pagliaccio! Questa pagina è riservata agli admin!',
      icon: 'error',
      confirmButtonText: 'Torno nei campi 😔',
    });
    return redirect('/dashboard');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: '/landing-page',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    loader: checkIfUserNotLogged,
  },
  {
    path: '/my-profile',
    element: <MyProfile />,
    loader: checkIfUserNotLogged,
  },
  {
    path: '/universe-stats',
    element: <UniverseStats />,
    loader: checkIfUserNotLogged,
  },
  {
    path: '/users',
    element: <Users />,
    loader: checkIfUserIsAdmin,
  },
]);

function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

export default App;
