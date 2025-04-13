"use client";

import React, { useEffect, useState } from "react";
import { BiComment, BiDislike, BiLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLogoVk, IoLogoYoutube } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";

interface TrailerItem {
  id: number;
  title: string;
  backdrop_path: string;
}

interface VideoData {
  key: string;
  name: string;
  site: string;
  [key: string]: string;
}

const NewTrailers: React.FC = () => {
  const [trailers, setTrailers] = useState<TrailerItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_APIKEY;

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=ru-RU&page=1&api_key=${API_KEY}`
      );
      const data = await res.json();
      if (!data.results) throw new Error("Не удалось получить список фильмов");
      setTrailers(data.results);
    } catch (error) {
      console.error("Ошибка при получении фильмов:", error);
    }
  };

  const fetchTrailer = async (id: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=ru-RU&api_key=${API_KEY}`
      );
      const data = await res.json();
      const youtubeVideos = data.results?.filter(
        (v: VideoData) => v.site === "YouTube"
      );
      if (youtubeVideos.length > 0) {
        const randomVideo =
          youtubeVideos[Math.floor(Math.random() * youtubeVideos.length)];
        setSelectedVideo(randomVideo);
      } else {
        setSelectedVideo(null);
      }
    } catch (error) {
      console.error("Ошибка при получении трейлера:", error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return (
    <div className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-10 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="font-black text-2xl lg:text-6xl sm:text-3xl md:text-4xl text-white">
          Новые трейлеры
        </h1>
        <p className="flex items-center gap-5 text-white text-base sm:text-lg font-medium cursor-pointer hover:text-gray-300">
          Все трейлеры <FaArrowRightLong />
        </p>
      </div>

      <div className="mt-6">
        <iframe
          src={
            selectedVideo
              ? `https://www.youtube.com/embed/${selectedVideo.key}`
              : "https://www.youtube.com/embed/55qOCxcLj6o"
          }
          className="w-full h-[200px] sm:h-[300px] md:h-[450px] xl:h-[600px] rounded-xl"
          allowFullScreen
        ></iframe>

        <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
          <div>
            <h2 className="text-white font-bold text-xl sm:text-2xl md:text-3xl">
              {selectedVideo?.key}
            </h2>
            <div className="flex gap-3 mt-2 flex-wrap">
              <IoLogoVk className="text-gray-500 hover:text-white transition-all cursor-pointer hover:scale-150" />
              <FaInstagram className="text-gray-500 hover:text-white transition-all cursor-pointer hover:scale-150" />
              <FaFacebookF className="text-gray-500 hover:text-white transition-all cursor-pointer hover:scale-150" />
              <FaTwitter className="text-gray-500 hover:text-white transition-all cursor-pointer hover:scale-150" />
              <IoLogoYoutube className="text-gray-500 hover:text-white transition-all cursor-pointer hover:scale-150" />
              <BsThreeDots className="text-gray-500 hover:text-white transition-all cursor-pointer hover:scale-150" />
            </div>
          </div>

          <div className="flex gap-4">
            {[
              { icon: <BiLike />, count: 3245 },
              { icon: <BiDislike />, count: 313 },
              { icon: <BiComment />, count: 100 },
            ].map((btn, idx) => (
              <div key={idx} className="text-center text-white">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1B2133] cursor-pointer flex items-center justify-center rounded-md hover:scale-95 transition">
                  {btn.icon}
                </div>
                <span className="text-xs mt-1 block">{btn.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-custom mt-6 pb-3">
        {trailers.map((item) => (
          <div
            key={item.id}
            className="pt-2 shrink-0 w-[160px] sm:w-[180px] md:w-[220px]"
          >
            <div
              className="relative group h-[110px] sm:h-[130px] md:h-[160px] xl:h-[180px] bg-cover bg-center rounded-xl cursor-pointer"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`,
              }}
              onClick={() => fetchTrailer(item.id)}
            >
              <div className="absolute inset-0 bg-[#3657CBA6] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                <TbPlayerPlayFilled className="text-white" size={28} />
              </div>
            </div>
            <p className="text-white font-semibold text-sm mt-2 truncate">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewTrailers;
