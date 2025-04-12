import Header from "@/components/custom/Header";
import { myKey } from "@/exports";
import { Movie } from "@/types/movie";
import Footer from "@/components/custom/footer";
import CardMovie from "@/components/custom/CardMovie";
import UpcomingFilms from "@/components/custom/Upcoming";
import PopularFilms from "@/components/custom/PopularFilms";
import PopularPerson from "@/components/custom/PopularPersons";
import { Person } from "@/types/person";

export default function Home({
  movies,
  persons,
}: {
  movies: Movie[];
  persons: Person[];
}) {
  return (
    <>
      <div
        className="flex flex-col items-center gap-10 w-full bg-no-repeat bg-center bg-top bg-[#1e2538]"
        style={{
          backgroundImage: "url(/main-bg.png)",
        }}
      >
        <Header title={"Наиболее популярные"} />
        <div className="max-w-[1250px]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
            {movies.map((movie) => (
              <CardMovie key={movie.id} movie={movie} />
            ))}
          </div>

          <PopularPerson persons={persons} />

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
