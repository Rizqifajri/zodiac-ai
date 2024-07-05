"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import html from '@/assets/icons/html.png';
import css from '@/assets/icons/css.png';
import javascript from '@/assets/icons/js.png';
import nextjs from '@/assets/icons/nextjs.png';
import react from '@/assets/icons/reactjs.png';
import typescript from '@/assets/icons/ts.png';
import Image, { StaticImageData } from "next/image";

const botImages: { [key: string]: StaticImageData } = {
  html: html,
  css: css,
  javascript: javascript,
  nextjs: nextjs,
  react: react,
  typescript: typescript
};

export const Dropdown: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const bot = searchParams.get('bot');

  useEffect(() => {
    if (bot) {
      setSelectedBot(bot);
    }
  }, [bot]);

  const handleSelect = (bot: string) => {
    setSelectedBot(bot);
    router.push('?bot=' + bot);
    console.log(bot);
  };

  return (
    <div>
      <details className="dropdown">
        <summary className="btn m-1 w-40">
          {selectedBot ? (
            <div className="flex items-center">
              <Image className="w-6 h-6 mr-2" src={botImages[selectedBot]} alt={selectedBot} />
              {selectedBot.toUpperCase()}
            </div>
          ) : 'select bot'}
        </summary>
        <ul className="menu flex justify-center items-center text-center dropdown-content bg-base-100 rounded-box z-[1] w-56 p-2 shadow">
          <li className="cursor-pointer w-full hover:bg-base-200 p-2 rounded-md" onClick={() => handleSelect('html')}>
            <Image className="w-14 mx-auto" src={html} alt="HTML" />
            HTML
          </li>
          <li className="cursor-pointer w-full hover:bg-base-200 p-2 rounded-md" onClick={() => handleSelect('css')}>
            <Image className="w-14 mx-auto" src={css} alt="CSS" />
            CSS
          </li>
          <li className="cursor-pointer w-full hover:bg-base-200 p-2 rounded-md" onClick={() => handleSelect('javascript')}>
            <Image className="w-14 mx-auto" src={javascript} alt="JavaScript" />
            JavaScript
          </li>
          <li className="cursor-pointer w-full hover:bg-base-200 p-2 rounded-md" onClick={() => handleSelect('nextjs')}>
            <Image className="w-14 mx-auto" src={nextjs} alt="Next.js" />
            Next.js
          </li>
          <li className="cursor-pointer w-full hover:bg-base-200 p-2 rounded-md" onClick={() => handleSelect('react')}>
            <Image className="w-14 mx-auto" src={react} alt="React" />
            React
          </li>
          <li className="cursor-pointer w-full hover:bg-base-200 p-2 rounded-md" onClick={() => handleSelect('typescript')}>
            <Image className="w-14 mx-auto" src={typescript} alt="TypeScript" />
            TypeScript
          </li>
        </ul>
      </details>
    </div>
  );
};
