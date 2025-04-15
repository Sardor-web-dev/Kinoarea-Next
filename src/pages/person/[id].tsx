import CardMovie from "@/components/custom/CardMovie";
import Header from "@/components/custom/Header";
import { myKey } from "@/exports";
import { Person } from "@/types/actor";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";

const PersonPage = ({ person }: { person: Person }) => {
  const media = [...(person.combined_credits.cast || [])].sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  );

  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="w-full bg-[#1e2538]">
      <div className="min-h-screen bg-[#1e2538] max-w-[1200px] mx-auto text-white px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-10">
          <div className="relative w-full max-w-[300px] h-[450px] mx-auto md:mx-0 rounded-xl overflow-hidden shadow-xl">
            <Image
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  : "/no-image.png"
              }
              alt={person.name}
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold">{person.name}</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Дата рождения: {person.birthday}
            </p>
            <p className="text-gray-400 text-sm sm:text-base">
              Место рождения: {person.place_of_birth}
            </p>
            <p className="mt-4 leading-relaxed text-base sm:text-lg max-w-3xl">
              {person.biography || "Биография недоступна."}
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            Фильмография
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {media.slice(0, visibleCount).map((item) => (
              <CardMovie
                key={item.id}
                movie={{
                  id: item.id,
                  title: item.title || item.name || "Без названия",
                  poster_path: item.poster_path || "",
                  release_date: "",
                  genre_ids: [],
                }}
              />
            ))}
          </div>

          {visibleCount < media.length && (
            <div className="flex pb-10 justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-[#1e2538] border-1 opacity-70 border-white cursor-pointer text-white rounded-md hover:opacity-100 transition"
              >
                Показать ещё
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${myKey}&language=ru-RU&append_to_response=combined_credits`
  );
  const person = await res.json();

  return {
    props: { person },
  };
};

export default PersonPage;
