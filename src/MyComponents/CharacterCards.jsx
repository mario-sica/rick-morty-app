import React, { useEffect, useState } from "react";

const API_URL = "https://rickandmortyapi.com/api";

export const CharacterCards = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});
  // const [collection, setCollection] = useState(() => {
  //   const savedCollection = localStorage.getItem("collection");
  //   return savedCollection ? JSON.parse(savedCollection) : [];
  // });
  const [userRole, setUserRole] = useState(null); // Stato per il ruolo dell'utente

  useEffect(() => {
    // Funzione per recuperare il ruolo dell'utente dal localStorage
    const fetchUserRole = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role_id) {
        setUserRole(user.role_id);
      }
    };

    fetchUserRole();
  }, []);

  const updateCharacterName = (id, newName) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id ? { ...character, name: newName } : character
      )
    );
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`${API_URL}/character?page=${page}`);
        const data = await response.json();
        setCharacters(data.results);
        setInfo(data.info);
      } catch (error) {
        console.error("Errore nel fetching dei personaggi:", error);
      }
    };
    fetchCharacters();
  }, [page]);

  // const addToCollection = (character) => {
  //   setCollection((prevCollection) => {
  //     const updatedCollection = [...prevCollection, character];
  //     localStorage.setItem("collection", JSON.stringify(updatedCollection));
  //     return updatedCollection;
  //   });
  // };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="character-cards mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 w-fit">
        {characters.map((character) => (
          <div
            key={character.id}
            className="card bg-white card-compact shadow-xl max-w-[400px]"
          >
            <img
              className="object-cover rounded-t-xl"
              src={character.image}
              alt={character.name}
            />
            <div className="card-body">
              <h2 className="card-title font-bold text-[#1aabc0]">
                {userRole === 2 ? (
                  <input
                    type="text"
                    defaultValue={character.name}
                    onBlur={(e) =>
                      updateCharacterName(character.id, e.target.value)
                    }
                    className="input input-bordered"
                  />
                ) : (
                  character.name
                )}
                <div className="badge badge-neutral h-fit">
                  {character.species}
                </div>
              </h2>
              <p>
                {`${character.name} was born ${
                  character.origin.name === "unknown"
                    ? "somewhere in the universe"
                    : `on ${character.origin.name}`
                }, last time was seen here:`}
                <br />
                <span className="font-bold">{`${character.location.name}`}</span>
              </p>
              <div className="card-actions justify-end">
                <button className="btn bg-green-600 text-white">Add +</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination sticky bottom-6 mt-5 bg-white shadow-lg p-2 rounded-full">
        <button
          className="py-2 m-2 bg-green-600 text-white btn rounded-full"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Precedente
        </button>
        <span>
          Pagina {page} di {info.pages}
        </span>
        <button
          className="py-2 m-2 bg-green-600 text-white btn rounded-full"
          onClick={() => setPage((prev) => Math.min(prev + 1, info.pages))}
          disabled={page === info.pages}
        >
          Successivo
        </button>
      </div>
    </div>
  );
};
