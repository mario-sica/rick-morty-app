import React, { useEffect, useState } from "react";
import locationImg from "../assets/locationImg.jpg";

const API_URL = "https://rickandmortyapi.com/api";

export const LocationCards = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_URL}/location?page=${page}`);
        const data = await response.json();
        setLocations(data.results);
        setInfo(data.info);
      } catch (error) {
        console.error("Errore nel fetching delle località:", error);
      }
    };
    fetchLocations();
  }, [page]);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="location-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 w-[90vw]">
        {locations.map((location) => (
          <div
            key={location.id}
            className="card bg-white card-compact shadow-xl"
          >
            <img
              className="object-cover rounded-t-xl"
              src={locationImg}
              alt={location.name}
            />
            <div className="card-body">
              <h2 className="card-title font-bold text-[#1aabc0]">
                {location.name}
                <div className="badge badge-neutral">{location.type}</div>
              </h2>
              <p>
                {`${location.name} is a ${
                  location.type
                } that actually exist in ${
                  location.dimension === "unknown"
                    ? "an unspecified dimension"
                    : location.dimension
                }`}
              </p>
              <div className="card-actions justify-end">
                <button className="btn bg-green-600 text-white">Who lives here?</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination fixed bottom-0 bg-white shadow-lg p-2 mb-4 rounded-full">
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
