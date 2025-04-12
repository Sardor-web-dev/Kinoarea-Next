import CardMovie from "@/components/custom/CardMovie";
import Footer from "@/components/custom/footer";
import Header from "@/components/custom/Header";
import { myKey } from "@/exports";
import { Movie } from "@/types/movie";

export default function Popular({ movies }: { movies: Movie[] }) {
  return (
    <div
      className="flex flex-col items-center gap-10 w-full bg-no-repeat bg-center bg-top bg-[#1e2538]"
      style={{
        backgroundImage: "url(/main-bg.png)",
      }}
    >
      <Header title={"Сейчас в кино"} />
      <div className="max-w-[1250px]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {movies.map((movie) => (
            <CardMovie key={movie.id} movie={movie} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=" + myKey
  );

  if (!res.ok) {
    return {
      props: {
        movies: [],
      },
    };
  }

  const data = await res.json();

  return {
    props: {
      movies: data.results,
    },
  };
}
