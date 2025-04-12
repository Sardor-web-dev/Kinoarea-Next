import Header from "@/components/custom/Header";
import { myKey } from "@/exports";
import { Movie } from "@/types/movie";
import Footer from "@/components/custom/footer";
import CardMovie from "@/components/custom/CardMovie";
import UpcomingFilms from "@/components/custom/Upcoming";
import PopularFilms from "@/components/custom/PopularFilms";
import PopularPerson from "@/components/custom/PopularPersons";
import NewTrailers from "@/components/custom/Trailers";
import { useState } from "react";
import { Person } from "@/types/person";

export default function Home({
  movies,
  persons,
}: {
  movies: Movie[];
  persons: Person[];
}) {
  const [visibleMovies, setVisibleMovies] = useState(8); // Изначально показываем 8 фильмов

  const showMoreMovies = () => {
    setVisibleMovies((prev) => prev + 8); // Увеличиваем количество отображаемых фильмов на 8
  };

  return (
    <>
      <div
        className="flex flex-col items-center gap-10 w-full bg-no-repeat bg-center bg-top bg-[#1e2538]"
        style={{
          backgroundImage: "url(/main-bg.png)",
        }}
      >
        <Header title={"Наиболее популярные"} />
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
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
              >
                Еще
              </button>
            </div>
          )}

          <PopularPerson persons={persons} />
          <NewTrailers />
          <UpcomingFilms />
          <PopularFilms />
          <Footer />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [moviesRes, personsRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${myKey}`),
      fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${myKey}&language=ru-RU&page=1`
      ),
    ]);

    if (!moviesRes.ok || !personsRes.ok) {
      throw new Error("Ошибка при загрузке данных");
    }

    const moviesData = await moviesRes.json();
    const personsData = await personsRes.json();

    return {
      props: {
        movies: moviesData.results,
        persons: personsData.results,
      },
    };
  } catch (error) {
    console.error("Ошибка getServerSideProps:", error);
    return {
      props: {
        movies: [],
        persons: [],
      },
    };
  }
}
