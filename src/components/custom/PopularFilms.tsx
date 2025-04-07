import React, { useEffect, useState } from 'react';
import CardMovie from '@/components/custom/CardMovie';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import { myKey } from '@/exports';
import { Movie } from '@/types/movie';

const PopularFilms = () => {
  const [popularFilms, setPopularFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const filmsPerPage = 4;

  useEffect(() => {
    const fetchPopularFilms = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${myKey}&language=en-US&page=1`
        );
        setPopularFilms(response.data.results);
      } catch (error) {
        console.error('Error fetching popular films:', error);
      }
    };

    fetchPopularFilms();
  }, []);

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
        <div className="flex items-center gap-5 text-white">
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
