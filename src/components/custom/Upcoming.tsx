import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CardMovie from "@/components/custom/CardMovie";
import { myKey } from "@/exports";
import axios from "axios";
import { Movie } from "@/types/movie";

const UpcomingFilms = () => {
  const [upcomingFilms, setUpcomingFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const filmsPerPage = 4;

  useEffect(() => {
    const fetchUpcomingFilms = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${myKey}&language=en-US&page=1`
        );
        setUpcomingFilms(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming films:", error);
      }
    };

    fetchUpcomingFilms();
  }, []);

  const nextPage = () => {
    if ((currentPage + 1) * filmsPerPage < upcomingFilms.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedMovies = upcomingFilms.slice(
    currentPage * filmsPerPage,
    (currentPage + 1) * filmsPerPage
  );

  return (
    <div className="mt-12 max-w-[1250px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl md:text-6xl font-black text-white">
          Ожидаемые новинки
        </h1>
        <div className="flex items-center gap-5 text-white">
          <FaArrowLeft
            className="cursor-pointer hover:opacity-75"
            onClick={prevPage}
          />
          <span>
            {currentPage + 1} / {Math.ceil(upcomingFilms.length / filmsPerPage)}
          </span>
          <FaArrowRight
            className="cursor-pointer hover:opacity-75"
            onClick={nextPage}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
        {displayedMovies.map((movie : Movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingFilms;
