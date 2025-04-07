import CardMovie from "@/components/custom/CardMovie";
import Footer from "@/components/custom/footer";
import Header from "@/components/custom/Header";
import { myKey } from "@/exports";
import { Movie } from "@/types/movie";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Popular() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    try {
      axios
        .get("https://api.themoviedb.org/3/movie/popular?api_key=" + myKey)
        .then((res) => setMovies(res.data.results));
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log(movies);
  return (
    <div className="flex flex-col items-center gap-10 bg-gradient-to-br from-[#0C0C0C] to-[#1A1A1A]">
      <Header title={"Сейчас в кино"} />
      <div className="max-w-[1250px]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {movies.map((movie) => (
            <CardMovie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
