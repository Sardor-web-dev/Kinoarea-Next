import Header from "@/components/custom/Header";
import { myKey } from "@/exports";
import { GetServerSideProps } from "next";
import Image from "next/image";

interface MediaItem {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path: string | null;
  character?: string;
  job?: string;
  popularity?: number;
}

interface Person {
  id: number;
  name: string;
  birthday: string;
  biography: string;
  profile_path: string | null;
  place_of_birth: string;
  combined_credits: {
    cast: MediaItem[];
    crew: MediaItem[];
  };
}

const PersonPage = ({ person }: { person: Person }) => {
  const media = [...(person.combined_credits.cast || [])]
    .sort((a, b) => (a.popularity || 0) - (b.popularity || 0))
    .reverse();

  return (
      <div className="min-h-screen bg-[#1c2230] text-white p-8 md:p-12">
        <Header title={person.name} />
      <div className="flex mt-10 flex-col md:flex-row gap-10">
        <div className="relative w-[300px] h-[450px] rounded-xl overflow-hidden shadow-xl">
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

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{person.name}</h1>
          <p className="text-gray-400">Дата рождения: {person.birthday}</p>
          <p className="text-gray-400">
            Место рождения: {person.place_of_birth}
          </p>
          <p className="mt-4 leading-relaxed text-lg max-w-3xl">
            {person.biography || "Биография недоступна."}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Фильмография</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {media.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-800 rounded-xl overflow-hidden shadow-md"
            >
              <div className="relative w-full h-[300px]">
                <Image
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "/no-image.png"
                  }
                  alt={item.title || item.name || "Нет названия"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-white text-sm line-clamp-2">
                  {item.title || item.name}
                </p>
                <p className="text-sm text-yellow-400">
                  {item.character
                    ? `Роль: ${item.character}`
                    : item.job
                    ? `Должность: ${item.job}`
                    : ""}
                </p>
                <p className="text-gray-400 text-xs mt-1 uppercase">
                  {item.media_type === "movie" ? "Фильм" : "Сериал"}
                </p>
              </div>
            </div>
          ))}
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
