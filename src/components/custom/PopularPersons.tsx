import Image from "next/image";
import Link from "next/link";

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
}

const PopularPerson = ({ persons }: {persons: Person[]}) => {
  console.log(persons);
  const topTwo = persons.slice(0, 2);
  const rest = persons.slice(0,7);

  return (
    <div className="flex flex-col mt-10 gap-10 text-white">
      <div className="flex w-full justify-between items-center">
        <p className="text-4xl md:text-6xl font-black">Популярные персоны</p>
        <div className="hidden lg:flex items-center gap-6 text-xl font-bold text-gray-500">
          <span className="hover:text-white cursor-pointer">За год</span>
          <span className="hover:text-white cursor-pointer">За месяц</span>
          <span className="text-white cursor-pointer">За неделю</span>
        </div>
      </div>

      <div className="flex flex-col justify-between lg:flex-row gap-8">
        <div className="flex gap-6">
          {topTwo.map((person, index) => (
            <Link
              href={`/person/${person.id}`}
              key={person.id}
              className="relative bg-zinc-800 rounded-2xl overflow-hidden w-[300px] h-[420px] shadow-md group"
            >
              <Image
              width={300}
              height={420}
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                    : "/no-image.png"
                }
                alt={person.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 text-yellow-400 font-bold text-lg">
                {index + 1}-е место
              </div>
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold text-lg">
                  {person.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-zinc-800 rounded-2xl p-4 w-full max-w-sm">
          {rest.map((person, index) => (
            <Link
              href={`/person/${person.id}`}
              key={person.id}
              className="flex justify-between items-center py-4 border-b border-zinc-700 last:border-none hover:bg-zinc-700/40 px-2 rounded-lg transition"
            >
              <p className="font-semibold text-white">{person.name}</p>
              <div className="text-yellow-400 font-bold text-sm">
                {index + 3}-е место
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPerson;


