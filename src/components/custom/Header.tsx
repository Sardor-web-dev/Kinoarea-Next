import Image from "next/image";
import Link from "next/link";
import { FaVk, FaInstagram, FaFacebookF, FaSearch } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { Button } from "@/components/ui/button";

const Header = ({ title }: { title: string | undefined }) => {
  const iconStyles = "hover:text-white cursor-pointer transition";
  const linkStyles =
    "hover:text-[#3657CB] transition whitespace-nowrap text-sm md:text-base";

  return (
    <>
      <div className="flex w-full mb-5 pt-5 max-w-[1250px] flex-col items-center gap-10 px-4 mx-auto">
        <div className="flex w-full lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center">
            <div>
              <Link href={"/"}>
                <Image
                  src="/logo.png"
                  width={120}
                  height={120}
                  alt="logo"
                  className="cursor-pointer"
                />
              </Link>
            </div>
            <div className="hidden lg:flex gap-2 mt-2 text-xl text-gray-600">
              <FaVk className={iconStyles} title="VK" />
              <FaInstagram className={iconStyles} title="Instagram" />
              <FaFacebookF className={iconStyles} title="Facebook" />
              <IoLogoTwitter className={iconStyles} title="Twitter" />
            </div>
          </div>

          <div className="hidden lg:flex flex-wrap justify-center gap-4 text-sm md:text-base text-center">
            <Link className={linkStyles} href="/">
              Афиша
            </Link>
            <Link className={linkStyles} href="/">
              Медия
            </Link>
            <Link className={linkStyles} href="/popular">
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
              className="h-[40px] w-[40px] bg-white cursor-pointer hover:bg-white hover:opacity-75"
              aria-label="Поиск"
            >
              <FaSearch className="text-gray-500 hover:text-black" />
            </Button>

            <Button className="w-[100px] h-[40px] bg-[#3657CB] shadow-[0_4px_16px_rgba(8,_112,_184,_0.6)] hover:bg-[#3670CB] cursor-pointer transition-all text-white hover:shadow-[4px_8px_16px_rgba(8,_112,_184,_0.6)]">
              Войти
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
