import Image from "next/image";
import Link from "next/link";
import { FaVk } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const iconStyles = "hover:text-white cursor-pointer transition";
  const linkStyles = "hover:text-[#3657CB] transition";

  return (
    <>
      <div className="flex w-[1250px] flex-col items-center gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-center">
            <div>
              <Image src="/logo.png" width={150} height={150} alt="logo" />
            </div>
            <div className="flex gap-2 mt-2 text-xl text-gray-600">
              <FaVk className={iconStyles} title="VK" />
              <FaInstagram className={iconStyles} title="Instagram" />
              <FaFacebookF className={iconStyles} title="Facebook" />
              <IoLogoTwitter className={iconStyles} title="Twitter" />
            </div>
          </div>
          <div className="flex gap-4 text-sm md:text-base">
            <Link className={linkStyles} href="/">
              Афиша
            </Link>
            <Link className={linkStyles} href="/">
              Медия
            </Link>
            <Link className={linkStyles} href="/">
              Фильмы
            </Link>
            <Link className={linkStyles} href="/">
              Актеры
            </Link>
            <Link className={linkStyles} href="/">
              Новости
            </Link>
            <Link className={linkStyles} href="/">
              Подборки
            </Link>
            <Link className={linkStyles} href="/">
              Категории
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="h-[53px] bg-white cursor-pointer hover:bg-white hover:opacity-75"
              aria-label="Поиск"
            >
              <FaSearch className="text-gray-500 hover:text-black" />
            </Button>

            <Button className="w-[138px] h-[53px] bg-[#3657CB] shadow-[0_5px_20px_rgba(8,_112,_184,_0.7)] hover:bg-[#3670CB] cursor-pointer transition-all text-white hover:shadow-[5px_10px_20px_rgba(8,_112,_184,_0.7)]">
              Войти
            </Button>
          </div>
        </div>
        <div className="flex gap-10 w-full items-center">
          <p className="text-4xl font-bold">Сейчас в кино</p>
          <div className="border-b-2 w-23 border-white"></div>
          <p className="text-xl cursor-pointer hover:text-white transition text-white">Все</p>
          <p className="text-xl cursor-pointer hover:text-white transition text-gray-500">Боевики</p>
          <p className="text-xl cursor-pointer hover:text-white transition text-gray-500">Приключения</p>
          <p className="text-xl cursor-pointer hover:text-white transition text-gray-500">Комедии</p>
          <p className="text-xl cursor-pointer hover:text-white transition text-gray-500">Фантастика</p>
          <p className="text-xl cursor-pointer hover:text-white transition text-gray-500">Триллеры</p>
          <p className="text-xl cursor-pointer hover:text-white transition text-gray-500">Драма</p>
        </div>
      </div>
    </>
  );
};

export default Header;
