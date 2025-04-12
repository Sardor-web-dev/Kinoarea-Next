import React, { useState } from "react";
import CardMovie from "@/components/custom/CardMovie";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Movie } from "@/types/movie";

const PopularFilms = ({ popularFilms }: { popularFilms: Movie[] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const filmsPerPage = 4;

  const nextPage = () => {
    if ((currentPage + 1) * filmsPerPage < popularFilms.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedMovies = popularFilms.slice(
    currentPage * filmsPerPage,
    (currentPage + 1) * filmsPerPage
  );

  return (
    <div className="mt-12 max-w-[1250px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl md:text-6xl font-black text-white">
          Популярные фильмы
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
        {displayedMovies.map((movie: Movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-5 text-white mt-6 select-none">
        <FaArrowLeft
          className="cursor-pointer hover:opacity-75"
          onClick={prevPage}
        />
        <span>
          {currentPage + 1} / {Math.ceil(popularFilms.length / filmsPerPage)}
        </span>
        <FaArrowRight
          className="cursor-pointer hover:opacity-75"
          onClick={nextPage}
        />
      </div>
    </div>
  );
};

export default PopularFilms;
