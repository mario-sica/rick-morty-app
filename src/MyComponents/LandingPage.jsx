import { useState, useEffect } from "react";
import { Register } from "./Register";
import { useNavigate } from "react-router-dom";
import logo from "../assets/rickemortylogo.png";
import Swal from "sweetalert2";

export const LandingPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setIsLogged(true) : setIsLogged(false);
  }, []);

  const handleShowRegister = () => {
    if (!showRegister) {
      setShowRegister(true);
    }
  };

  const handleShowLogin = () => {
    if (!isLogged) {
      setIsRegistered(true);
      handleShowRegister();
    } else {
      navigate("/dashboard");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "overlay") {
      setShowRegister(false);
      setIsRegistered(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between h-[450px] sm:h-[450px] md:h-[600px] lg:h-[700px] p-0 bg-image">
        <div className="sticky top-0 z-10 flex justify-center items-center shadow-md bg-white md:bg-black md:bg-opacity-5 backdrop-blur-sm">
          <img src={logo} alt="" className="h-20" />
          <button
            onClick={handleShowLogin}
            className="absolute right-0 bg-[#1aabc0] hover:bg-white active:bg-[#1aabc0] rounded-lg px-5 py-3 text-white hover:text-[#1aabc0] active:text-white font-bold hover:underline mr-10"
          >
            {isLogged ? "Hey! Torna qui!" : "Log in"}
          </button>
        </div>
        {/* <img src={bgImg} alt="" /> */}
        <div className="flex flex-col pb-10 md:pb-20 pl-8 md:pl-16 w-1/2">
          <div className="bg-black bg-opacity-40 backdrop-blur-sm p-5 md:p-7 lg:p-8 rounded-lg min-w-[300px] max-w-[480px]">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-6 lg:mb-8">
              Collezionale <span className="text-[#1aabc0]">tutte!</span>
            </h1>
            <p className="text-white text-sm md:text-base">
              Con il nuovo raccoglitore di figurine digitale di Rick e Morty,
              tutti i tuoi personaggi preferiti sono ad un solo click da te,
              registrati ora per iniziare a collezionarle tutte!
            </p>
            <button
              onClick={handleShowRegister}
              className="mt-6 px-6 py-4 bg-green-600 active:bg-white rounded-lg text-white active:text-green-600 text-md font-bold "
            >
              Registrati ora
            </button>
          </div>
        </div>
      </div>
      <div
        id="overlay"
        onClick={handleOutsideClick}
        className={`fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center z-10 transition-opacity duration-500 ease-in-out ${
          showRegister ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`w-4/5 transition-all duration-500 transform ${
            showRegister ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Register
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
            isLogged={isLogged}
          />
        </div>
      </div>
    </div>
  );
};
