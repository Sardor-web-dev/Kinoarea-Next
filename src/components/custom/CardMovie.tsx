import Image from "next/image";
import { genres } from "@/helpers/genres";
import { Movie } from "@/types/movie";
import Link from "next/link";

type Props = {
  movie: Movie;
};

const CardMovie = ({ movie }: Props) => {
  const genreList = movie.genre_ids
    .map((id) => genres[id])
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");

  return (
    <div>
      <Link href={`/film/${movie.id}`} className="block group relative shadow-lg overflow-hidden rounded-lg cursor-pointer select-none">
        <div className="absolute inset-0 bg-[#3657CBA6] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        {movie.poster_path && (
          <Image
            width={500}
            height={750}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto object-cover"
          />
        )}
        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button className="bg-white text-[#3657CB] font-bold w-[200px] h-[60px] rounded-lg cursor-pointer">
            Карточка фильма
          </button>
        </div>
      </Link>

      <div className="mt-2">
        <h3 className="text-white text-sm font-bold">{movie.title}</h3>
        <p className="text-xs text-yellow-400 mt-1">{genreList}</p>
      </div>
    </div>
  );
};

export default CardMovie;
