import Link from "next/link";
import Header from "@/components/custom/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import { myKey } from "@/exports";
import axios from "axios";
import { genres } from "@/helpers/genres";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: Array<number>;
}

export default function Home() {
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
    <Header />
    <div className="max-w-[1250px]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
          {movies.map((movie) => (
            <div key={movie.id} className="flex flex-col gap-2">
              <Image
                width={200}
                height={300}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-md"
              />
              <div className="text-left flex flex-col ">
                <p className="mt-2 text-md font-medium">{movie.title}</p>
                <p className="text-xs text-yellow-400">
                  {movie.genre_ids
                    .map((id) => genres[id])
                    .slice(0, 2)
                    .join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
