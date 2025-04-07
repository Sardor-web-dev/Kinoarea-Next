  import Header from "@/components/custom/Header";
  import { useEffect, useState } from "react";
  import { myKey } from "@/exports";
  import axios from "axios";
  import { Movie } from "@/types/movie";
  import Footer from "@/components/custom/footer";
  import CardMovie from "@/components/custom/CardMovie";
  import UpcomingFilms from "@/components/custom/Upcoming";
  import PopularFilms from "@/components/custom/PopularFilms";

  export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
      try {
        axios
          .get("https://api.themoviedb.org/3/movie/top_rated?api_key=" + myKey)
          .then((res) => setMovies(res.data.results));
      } catch (error) {
        console.error(error);
      }
    }, []);

    console.log(movies);
    return (
      <div className="flex flex-col items-center gap-10 bg-gradient-to-br from-[#0C0C0C] to-[#1A1A1A]">
        <Header title={"Наиболее популярные"} />
        <div className="max-w-[1250px]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
            {movies.map((movie) => (
              <CardMovie key={movie.id} movie={movie} />
            ))}
          </div>
          <UpcomingFilms/>
          <PopularFilms/>
        </div>
        <Footer />
      </div>
    );
  }
