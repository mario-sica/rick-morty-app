import React, { useEffect, useState } from "react";

const API_URL = "https://rickandmortyapi.com/api";

export const CharacterCards = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});

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

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="character-cards mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 w-fit">
        {characters.map((character) => (
          <div key={character.id} className="card bg-white card-compact shadow-xl max-w-[400px]">
            <img
              className="object-cover rounded-t-xl"
              src={character.image}
              alt={character.name}
            />
            <div className="card-body">
              <h2 className="card-title font-bold text-[#1aabc0]">
                {character.name}
                <div className="badge badge-neutral h-fit">{character.species}</div>
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
