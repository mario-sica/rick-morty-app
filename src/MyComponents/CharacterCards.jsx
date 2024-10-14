import React, { useEffect, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api';

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
        console.error('Errore nel fetching dei personaggi:', error);
      }
    };
    fetchCharacters();
  }, [page]);

  return (
    <div>
      <div className="character-cards grid grid-cols-4 gap-7">
        {characters.map(character => (
          <div key={character.id} className="card shadow-xl bg-white border rounded-xl p-2">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
            <p>Specie: {character.species}</p>
            <p>Tipo: {character.type || 'N/A'}</p>
            <p>Genere: {character.gender}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Precedente
        </button>
        <span>Pagina {page} di {info.pages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, info.pages))}
          disabled={page === info.pages}
        >
          Successivo
        </button>
      </div>
    </div>
  );
};
