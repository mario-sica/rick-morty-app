import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerimg from "../assets/register.jpg";
import remlogo from "../assets/rickemortylogo.png";
import Swal from "sweetalert2";

export const Register = ({ isRegistered, setIsRegistered, isLogged }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    marketing_accept: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const showError = (message) => {
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
      });
    };

    if (isRegistered) {
      const { email, password } = formData;

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role_id === 2) {
              Swal.fire({
                title: "Bentornato, sire",
                text: "E' arrivato il boss, mettete tutto in ordine!",
                icon: "warning",
                confirmButtonText: "Fate spazio al re.",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/dashboard");
                }
              });
            } else {
              Swal.fire({
                title: "Accesso",
                text: "Hai effettuato il login con successo!",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/dashboard");
                }
              });
            }
          } else {
            showError("ID utente non trovato");
          }
        } else {
          showError("Email o password non corretti");
        }
      } catch (error) {
        console.error("Errore durante il login:", error);
        showError("Si è verificato un errore durante il login");
      }
    } else {
      const { email, password, first_name, last_name, marketing_accept } =
        formData;

      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            first_name,
            last_name,
            marketing_accept,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          Swal.fire({
            title: "Accesso",
            text: "Hai effettuato la registrazione con successo!",
            icon: "success",
            confirmButtonText: "Letsgoski",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard");
            }
          });
        } else {
          const errorData = await response.json();
          const errorMessage =
            errorData.error ||
            "Errore durante la registrazione. Assicurati che l'email non sia già utilizzata.";

          showError(errorMessage);
          console.log(errorData);
        }
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
        showError("Si è verificato un errore durante la registrazione");
      }
    }
  };

  return (
    <section className="bg-white rounded-lg">
      <div className="lg:grid max-h-[90vh] lg:min-h-[95vh] lg:grid-cols-12 overflow-x-auto no-scrollbar">
        <aside
          className={`z-10 relative block h-full transition-all duration-300 transform ${
            isRegistered ? "lg:translate-x-0" : "lg:translate-x-full"
          } lg:col-span-6`}
        >
          <img
            alt=""
            src={registerimg}
            className="absolute h-full w-full object-cover object-center inset-0 rounded-e-lg"
          />
        </aside>

        <main
          className={`flex items-center justify-center px-6 py-8 sm:px-8 lg:px-6 lg:py-4 lg:col-span-6 transition-all duration-300 transform ${
            isRegistered ? "lg:translate-x-0" : "lg:-translate-x-full"
          }`}
        >
          <div className="max-w-xl lg:max-w-3xl w-full">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              {isRegistered
                ? "Accedi, cetriolino! 🥒"
                : "Diventa un cetriolino! 🥒"}
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              {isRegistered
                ? "Accedi per controllare le tue carte!"
                : "Entra a far parte anche tu della community di carte di Rick e Morty."}
            </p>

            <form
              action="submit"
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
              method="post"
            >
              {!isRegistered && (
                <>
                  <div className="col-span-6">
                    <label
                      htmlFor="FirstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome
                    </label>

                    <input
                      type="text"
                      id="FirstName"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="LastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cognome
                    </label>

                    <input
                      type="text"
                      id="LastName"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      required
                    />
                  </div>
                </>
              )}

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div
                className={
                  isRegistered ? "col-span-6" : "col-span-6 sm:col-span-3"
                }
              >
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              {!isRegistered && (
                <>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="PasswordConfirmation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Conferma Password
                    </label>

                    <input
                      type="password"
                      id="PasswordConfirmation"
                      className="mt-1 h-8 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      required
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="MarketingAccept" className="flex gap-4">
                      <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="marketing_accept"
                        checked={formData.marketing_accept}
                        onChange={handleChange}
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                      />

                      <span className="text-sm text-gray-700">
                        Voglio ricevere aggiornamenti su eventi, offerte e
                        promozioni.
                      </span>
                    </label>
                  </div>
                  <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                      {"Creando un account, accetti i nostri "}
                      <a href="#" className="text-gray-700 underline">
                        termini e condizioni
                      </a>
                      {" e le "}
                      <a href="#" className="text-gray-700 underline">
                        privacy policy
                      </a>
                      .
                    </p>
                  </div>
                </>
              )}

              <div className="col-span-6 flex flex-col justify-center items-center gap-2 mt-4 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500">
                  {isRegistered ? "Accedi" : "Crea un account"}
                </button>

                {!isLogged && (
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    {isRegistered
                      ? "Non sei registrato? "
                      : "Hai già un account? "}
                    <a
                      href="#"
                      className="text-gray-700 underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsRegistered(!isRegistered);
                        setFormData({
                          first_name: "",
                          last_name: "",
                          email: "",
                          password: "",
                          marketing_accept: false,
                        });
                      }}
                    >
                      {isRegistered ? "Registrati" : "Accedi"}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};
