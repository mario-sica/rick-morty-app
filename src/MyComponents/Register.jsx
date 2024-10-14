import { useState } from "react";
import registerimg from "../assets/register.jpg";
import remlogo from "../assets/rickemortylogo.png";

export const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    marketing_accept: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistered) {
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

          if (data.userId) {
            localStorage.setItem("userId", data.userId);
            setErrorMessage("");
            navigate("/dashboard");
          } else {
            setErrorMessage("ID utente non trovato");
          }
        } else {
          setErrorMessage("Email o password non corretti");
        }
      } catch (error) {
        console.error("Errore durante il login:", error);
        setErrorMessage("Si è verificato un errore durante il login");
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, first_name, last_name, marketing_accept }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          if (data.userId) {
            localStorage.setItem("userId", data.userId);
            setErrorMessage("");
            navigate("/dashboard");
          } else {
            setErrorMessage("ID utente non trovato");
          }
        } else {
          setErrorMessage("Email o password non corretti");
        }
      } catch (error) {
        console.error("Errore durante il login:", error);
        setErrorMessage("Si è verificato un errore durante la registrazione");
      }
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:w-screen lg:grid-cols-12">
        <aside
          className={`z-10 relative block h-full transition-all duration-300 transform ${
            isRegistered ? "lg:translate-x-0" : "lg:translate-x-full"
          } lg:col-span-6`}
        >
          <img
            alt=""
            src={registerimg}
            className="absolute h-full w-full object-cover object-center inset-0"
          />
        </aside>

        <main
          className={`flex items-center justify-center px-8 py-8 sm:px-12 lg:px-16 lg:py-12 lg:col-span-6 transition-all duration-300 transform ${
            isRegistered ? "lg:translate-x-0" : "lg:-translate-x-full"
          }`}
        >
          <div className="max-w-xl lg:max-w-3xl w-full">
            <div className="w-full flex justify-center items-center lg:justify-start">
              <a className="w-60" href="#">
                <span className="sr-only">Home</span>
                <img src={remlogo} alt="" />
              </a>
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
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
              action="#"
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
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
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};
