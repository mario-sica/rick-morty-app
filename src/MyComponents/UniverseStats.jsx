import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rickemortylogo.png";
import Swal from "sweetalert2";

export const UniverseStats = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [totalLocations, setTotalLocations] = useState(0);
  const [totalEpisodes, setTotalEpisodes] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    Swal.fire({
      title: "Loading...",
      text: "Checking authentication status",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (token) {
      setIsLogged(true);
      Swal.close();
    } else {
      setIsLogged(false);
      Swal.close();
    }
    if (!token) {
      navigate("/landing-page");
    }
  }, [navigate]);

  const API_URL = "https://rickandmortyapi.com/api";

  const fetchData = async () => {
    try {
      const charactersResponse = await fetch(`${API_URL}/character`);
      const charactersData = await charactersResponse.json();
      setTotalCharacters(charactersData.info.count);

      const locationsResponse = await fetch(`${API_URL}/location`);
      const locationsData = await locationsResponse.json();
      setTotalLocations(locationsData.info.count);

      const episodesResponse = await fetch(`${API_URL}/episode`);
      const episodesData = await episodesResponse.json();
      setTotalEpisodes(episodesData.info.count);
    } catch (error) {
      console.error("Errore nel fetching dei dati:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                <a onClick={() => navigate("/my-profile")}>Your profile</a>
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
      <div className="h-[65vh]">
        <div className="w-full flex justify-center my-9 text-4xl font-bold">
          <h1>Awesome stats!</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Totale Personaggi</h2>
              <p className="text-5xl font-bold text-[#1aabc0]">
                {totalCharacters}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Totale Location</h2>
              <p className="text-5xl font-bold text-[#1aabc0]">
                {totalLocations}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Totale Episodi</h2>
              <p className="text-5xl font-bold text-[#1aabc0]">
                {totalEpisodes}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
