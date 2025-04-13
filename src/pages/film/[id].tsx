import Link from "next/link";
import Footer from "@/components/custom/footer";
import { FaVk, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { CiPlay1 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { myKey } from "@/exports";
import Header from "@/components/custom/Header";
import Image from "next/image";
import { film } from "@/types/filmTypes";
import { GetServerSideProps } from "next";

const Film = ({ film }: { film: film }) => {
  return (
    <div
      className="w-full bg-no-repeat h-screen bg-centerbg-[#1e2538] text-white relative"
      style={{
        backgroundImage: film?.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${film.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-[black] opacity-50 z-10"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-20">
        <Header />
        <div className="py-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full max-w-[300px] mx-auto md:mx-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                width={300}
                height={450}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                {film.title}
              </h1>
              <p className="mb-4 text-sm sm:text-base max-w-lg">
                {film.overview}
              </p>

              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <button className="flex items-center justify-center gap-2 border px-4 py-2 rounded-lg text-white font-bold text-sm hover:bg-[#2b344d]">
                  <CiPlay1 /> Смотреть трейлер
                </button>
                <div className="flex gap-3 text-[#646462]">
                  <FaVk className="hover:text-white cursor-pointer" />
                  <FaInstagram className="hover:text-white cursor-pointer" />
                  <FaFacebookF className="hover:text-white cursor-pointer" />
                  <FaTwitter className="hover:text-white cursor-pointer" />
                  <BsThreeDots />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button className="hover:bg-[#1B2133] p-2">
                  <BiSolidLike />
                </Button>
                <Button className="hover:bg-[#1B2133] p-2">
                  <BiSolidDislike />
                </Button>
                <Button className="hover:bg-[#1B2133] px-4 text-xs sm:text-sm">
                  Рейтинг ожиданий <span>85%</span>
                </Button>
                <Button className="hover:bg-[#1B2133] p-2">
                  <FaHeart />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-10 my-10 text-sm sm:text-base">
            <div className="space-y-2">
              <p>
                Страна:{" "}
                <Link href="#" className="text-[#F2F60F]">
                  {film.origin_country}
                </Link>
              </p>
              <p>
                Слоган:{" "}
                <Link href="#" className="text-[#F2F60F]">
                  {film.tagline}
                </Link>
              </p>
              <p>
                Премьера (мир):{" "}
                <Link href="#" className="text-[#F2F60F]">
                  {film.release_date}
                </Link>
              </p>
              <p>
                Премьера (РФ):{" "}
                <Link href="#" className="text-[#F2F60F]">
                  {film.release_date}
                </Link>
              </p>
            </div>
            <div className="space-y-2">
              <p>
                Жанр:{" "}
                <Link href="#" className="text-[#F2F60F]">
                  {film.genres?.map((g) => g.name).join(", ")}
                </Link>
              </p>
              <p>
                Сборы в мире:{" "}
                <Link href="#" className="text-[#F2F60F]">
                  ${film.budget}
                </Link>
              </p>
              <p>
                Время:{" "}
                <Link href="#" className="text-[#F2F60F]">
                  {film.runtime} мин
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-8">
              В главных ролях:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {film.credits?.cast?.slice(0, 12).map((actor) => (
                <div key={actor.cast_id} className="text-center">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name}
                    width={300}
                    height={190}
                    className="rounded-lg object-cover w-full h-auto mb-2"
                  />
                  <p className="font-bold text-sm">{actor.name}</p>
                  <p className="text-xs text-[#F2F60F]">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#151A26]">
        <div className="max-w-[1200px] mx-auto py-10 px-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Film;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-EN&append_to_response=credits&api_key=${myKey}`
  );
  const film = await res.json();

  return {
    props: { film },
  };
};
