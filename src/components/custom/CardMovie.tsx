import Image from "next/image";
import { genres } from "@/helpers/genres";
import { Movie } from "@/types/movie";

type Props = {
  movie: Movie;
};

const CardMovie = ({ movie }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl overflow-hidden shadow-md bg-[#1f1f1f] hover:scale-105 transition-transform duration-300">
      <Image
        width={500}
        height={750}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto object-cover"
      />
      <div className="p-3 text-white">
        <h3 className="text-sm font-semibold line-clamp-2">{movie.title}</h3>
        <p className="text-xs text-yellow-400 mt-1">
          {movie.genre_ids
            .map((id) => genres[id])
            .filter(Boolean)
            .slice(0, 2)
            .join(", ")}
        </p>
      </div>
    </div>
  );
};

export default CardMovie;
