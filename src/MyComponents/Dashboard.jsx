import { useState, useEffect } from "react";
import { CharacterCards } from "./CharacterCards";
import logo from "../assets/rickemortylogo.png";
import bgImg from "../assets/bgImage.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LocationCards } from "./LocationCards";
import { Footer } from "./Footer";

export const Dashboard = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [type, setType] = useState("character");
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

  const changeType = () => {
    setType((prevType) =>
      prevType === "character" ? "location" : "character"
    );
  };

  const goToMyProfile = () => {
    navigate("/my-profile");
  };

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
                <div className="form-control">
                  <label className="label cursor-pointer sm:hidden flex flex-row">
                    <input
                      onClick={changeType}
                      type="checkbox"
                      className="toggle toggle-success toggle-lg"
                      defaultChecked
                    />
                    <span className="label-text ml-4 font-bold min-w-20">
                      {type === "character" ? "Characters" : "Locations"}
                    </span>
                  </label>
                </div>
              </li>
              <li>
                <a onClick={goToMyProfile}>Your Profile</a>
              </li>
              <li>
                <a>Universe Stats</a>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="btn btn-error mt-2 text-white"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img className="h-20" src={logo} alt="" />
        </div>
        <div className="navbar-end">
          <div className="form-control">
            <label className="label cursor-pointer hidden sm:flex flex-col md:flex-row">
              <input
                onClick={changeType}
                type="checkbox"
                className="toggle toggle-success toggle-lg"
                defaultChecked
              />
              <span className="label-text ml-4 font-bold min-w-20">
                {type === "character" ? "Characters" : "Locations"}
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-6 text-4xl font-bold">
        <h1>Available Cards</h1>
      </div>
      {type === "character" ? <CharacterCards /> : <LocationCards />}
      <Footer></Footer>
    </>
  );
};
