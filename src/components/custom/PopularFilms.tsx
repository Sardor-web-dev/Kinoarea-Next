import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Movie } from "@/types/movie";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import CardMovie from "@/components/custom/CardMovie";

const PopularFilms = ({ popularFilms }: { popularFilms: Movie[] }) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <div className="mt-12 max-w-[1250px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl md:text-6xl font-black text-white">
          Популярные фильмы
        </h1>
        <div className="flex items-center gap-5 text-white">
          <FaArrowLeft
            className="cursor-pointer hover:opacity-75"
            onClick={handlePrev}
          />
          <FaArrowRight
            className="cursor-pointer hover:opacity-75"
            onClick={handleNext}
          />
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {popularFilms.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            <CardMovie movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularFilms;
