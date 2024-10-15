import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rickemortylogo.png";
import Swal from "sweetalert2";
import { Footer } from "./Footer";

const API_URL = "http://localhost:3000";

export const MyProfile = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      icon: "question",
      title: "Te ne vai già?",
      text: "Sei sicuro di voler abbandonare proprio ora?",
      confirmButtonText: "Si, basta giocare",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/landing-page");
      }
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Errore nel recupero dei dati dell'utente:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Fantastico!",
          text: "La nuova password è stata salvata con successo.",
          timer: 2000,
        });
      } else {
        const error = await response.json();
        console.error("Errore durante l'aggiornamento della password:", error);
        Swal.fire({
          icon: "error",
          title: "Ahi ahi ahi!",
          text: "Errore durante l'aggiornamento della password",
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Errore nell'aggiornamento della password:", error);
    }
  };

  return (
    <>
      <div className="navbar bg-base-100 sticky top-0 z-10 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => navigate("/dashboard")}>Dashboard</a>
              </li>
              <li>
                <a>Universe Stats</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img className="h-20" src={logo} alt="" />
        </div>
        <div className="navbar-end">
          <button onClick={logout} className="btn btn-error mt-2 text-white">
            Logout
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-center my-9 text-4xl font-bold">
          <h1>Change your password</h1>
        </div>
        <div className="card bg-white text-black shadow-xl w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-[#1aabc0]">{`${userData.first_name} ${userData.last_name}`}</h2>
            <p>
              Email: <span className="font-semibold">{userData.email}</span>
            </p>
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="password"
                name="currentPassword"
                onChange={handlePasswordChange}
                placeholder="Password attuale"
                className="input input-bordered w-full max-w-xs"
                required
              />
              <input
                type="password"
                name="newPassword"
                onChange={handlePasswordChange}
                placeholder="Nuova Password"
                className="input input-bordered w-full max-w-xs mt-2"
                required
              />
              <button
                type="submit"
                className="btn bg-green-600 active:bg-white text-white active:text-green-600 font-bold mt-4"
              >
                Salva Modifiche
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
