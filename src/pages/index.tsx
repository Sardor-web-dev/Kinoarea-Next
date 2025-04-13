import { myKey } from "@/exports";
import { Movie } from "@/types/movie";
import CardMovie from "@/components/custom/CardMovie";
import UpcomingFilms from "@/components/custom/Upcoming";
import PopularFilms from "@/components/custom/PopularFilms";
import PopularPerson from "@/components/custom/PopularPersons";
import NewTrailers from "@/components/custom/Trailers";
import { useState } from "react";
import { Person } from "@/types/person";
import BaseLayout from "../../layouts/BaseLayout";

export default function Home({
  movies,
  persons,
  upcomingFilms,
  popularFilms,
}: {
  movies: Movie[];
  persons: Person[];
  upcomingFilms: Movie[];
  popularFilms: Movie[];
}) {
  const [visibleMovies, setVisibleMovies] = useState(8);

  const showMoreMovies = () => {
    setVisibleMovies((prev) => prev + 8);
  };

  return (
    <>
      <BaseLayout
        child={
          <>
            <div className="lg:flex max-w-[1200px] flex justify-center gap-6 w-full items-center text-center mt-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold w-full">
                Популярные Фильмы
              </p>
              <div className="hidden lg:flex lg:border-b-3 lg:text-white lg:w-25"></div>
              <div className="hidden lg:flex gap-4">
                <p className="text-lg sm:text-xl cursor-pointer hover:text-white transition text-white">
                  Все
                </p>
                <p className="text-lg sm:text-xl cursor-pointer hover:text-white transition text-gray-500">
                  Боевики
                </p>
                <p className="text-lg sm:text-xl cursor-pointer hover:text-white transition text-gray-500">
                  Приключения
                </p>
                <p className="text-lg sm:text-xl cursor-pointer hover:text-white transition text-gray-500">
                  Комедии
                </p>
                <p className="text-lg sm:text-xl cursor-pointer hover:text-white transition text-gray-500">
                  Фантастика
                </p>
                <p className="text-lg sm:text-xl cursor-pointer hover:text-white transition text-gray-500">
                  Триллеры
                </p>
                <p className="text-lg sm:text-xl cursor-pointer hover:text-white transition text-gray-500">
                  Драма
                </p>
              </div>
            </div>
            <div className="max-w-[1250px] w-full px-4 sm:px-6 lg:px-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-6">
                {movies.slice(0, visibleMovies).map((movie) => (
                  <CardMovie key={movie.id} movie={movie} />
                ))}
              </div>

              {visibleMovies < movies.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={showMoreMovies}
                    className="px-6 py-2 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Еще
                  </button>
                </div>
              )}

              <PopularPerson persons={persons} />
              <NewTrailers />

              <UpcomingFilms upcomingFilms={upcomingFilms} />
              <PopularFilms popularFilms={popularFilms} />
            </div>
          </>
        }
      />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [moviesRes, personsRes, upcomingRes, popularRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${myKey}`),
      fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${myKey}&language=ru-RU&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${myKey}&language=ru-RU&page=1`
      ),
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${myKey}&language=ru-RU&page=1`
      ),
    ]);

    if (!moviesRes.ok || !personsRes.ok || !upcomingRes.ok || !popularRes.ok) {
      throw new Error("Ошибка при загрузке данных");
    }

    const moviesData = await moviesRes.json();
    const personsData = await personsRes.json();
    const upcomingData = await upcomingRes.json();
    const popularData = await popularRes.json();

    return {
      props: {
        movies: moviesData.results,
        persons: personsData.results,
        upcomingFilms: upcomingData.results,
        popularFilms: popularData.results,
      },
    };
  } catch (error) {
    console.error("Ошибка getServerSideProps:", error);
    return {
      props: {
        movies: [],
        persons: [],
        upcomingFilms: [],
        popularFilms: [],
      },
    };
  }
}
