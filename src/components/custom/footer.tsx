import Link from "next/link";
import { FaVk, FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#1e2538]">
      <div
        className="mt-24 py-10 px-4 md:px-10 lg:px-20 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: "url(/footer_img.png)" }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-white mb-4 md:mb-6">
          Подпишитесь на E-mail рассылку
        </h2>
        <p className="text-base sm:text-lg md:text-xl font-medium text-center text-white mb-6 md:mb-8 px-2">
          Если хотите быть в курсе последних новостей и новинок кино — заполните форму ниже и оформите бесплатную E-mail рассылку!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 w-full max-w-3xl mx-auto px-2">
          <input
            type="email"
            placeholder="Введите свой E-mail адрес"
            className="w-full md:w-[500px] h-12 md:h-16 rounded-lg bg-white border-none text-base md:text-lg font-normal text-[#151A2660] pl-4 md:pl-7"
          />
          <button className="w-full md:w-[180px] h-12 md:h-16 rounded-lg bg-[#F2F60F] text-base md:text-lg font-bold text-[#151A26] mt-3 md:mt-0">
            Подписаться
          </button>
        </div>
        <label className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-5 text-center sm:text-left px-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#F2F60F]" />
            <p className="text-sm md:text-lg font-normal text-white">
              Соглашаюсь на условия
            </p>
          </div>
          <Link href="/" className="text-[#F2F60F] text-sm md:text-lg font-normal">
            политики конфиденциальности
          </Link>
        </label>
      </div>

      <footer className="bg-[#1e2538] mt-2 py-8 px-4">
        <div className="flex justify-center gap-5 text-[#646462] mb-6">
          <FaVk size={20} className="hover:text-white cursor-pointer" />
          <FaInstagram size={20} className="hover:text-white cursor-pointer" />
          <FaFacebookF size={20} className="hover:text-white cursor-pointer" />
          <FaTwitter size={20} className="hover:text-white cursor-pointer" />
          <FaYoutube size={20} className="hover:text-white cursor-pointer" />
        </div>

        <nav className="flex flex-wrap justify-center gap-5 sm:gap-8 text-xs sm:text-sm font-bold text-white text-center">
          <Link href="/">Афиша</Link>
          <Link href="/">Медиа</Link>
          <Link href="/film">Фильмы</Link>
          <Link href="/">Актеры</Link>
          <Link href="/">Новости</Link>
          <Link href="/">Подборки</Link>
          <Link href="/">Категории</Link>
        </nav>

        <div className="mt-8 text-center text-[#E3E6F072]">
          <p className="text-xs sm:text-sm font-normal mb-3">
            2020 © Kinoarea. Все права защищены
          </p>
          <Link href="/" className="text-xs sm:text-sm font-normal">
            Политика конфиденциальности
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
