'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { searchItems } from '@/constant/data';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { auth } from '@/auth';

import { List, Grid3X3 } from 'lucide-react';

import SearchList from '@/components/SearchList';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [text, setText] = useState('');
  const [copiedIds, setCopiedIds] = useState([]);
  const [visibleItem, setVisibleItem] = useState(15);
  const { data, status } = useSession();
  const [toggleList, setToggleList] = useState(() => false);

  const [theme, setTheme] = useState(() => {
    return 'light';
  });

  const handleCopy = async (searchWord, id) => {
    try {
      await navigator.clipboard.writeText(searchWord);
      setCopiedIds((prevState) => [...prevState, id]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadMore = () => {
    setVisibleItem((prevState) => prevState + 15);
  };

  useEffect(() => {
    if (typeof window != 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      const storedToogleList = localStorage.getItem('toogleList');
      console.log('stored', typeof storedToogleList);

      if (storedTheme) {
        setTheme(storedTheme);
      }
      if (storedToogleList) {
        setToggleList(storedToogleList);
      }
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', theme);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('toogleList', toggleList);
    console.log(toggleList);
  }, [toggleList]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  if (status === 'loading') {
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-5">
        <h2 className="text-3xl">Loading...</h2>
      </div>
    );
  }

  if (!data)
    return (
      <div className="h-screen flex flex-col  justify-center items-center gap-5">
        <h2 className="text-3xl">Please Login to view the content</h2>
        <Link
          href={'/login'}
          className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          Login with Google
        </Link>
      </div>
    );

  return (
    <div
      className="min-h-screen z-50 bg-gray-100 flex gap-10
    flex-col sticky dark:bg-gray-900 px-10"
    >
      <header className="flex justify-center items-center dark:text-white  w-full py-5 ">
        <div className="w-full flex items-center justify-center gap-10">
          <h1 className="text-[32px] font-bold text-center">
            Microsoft Rewards Search key words
          </h1>
        </div>
      </header>
      <div className="flex justify-end items-center p-3 gap-3">
        <button
          className="bg-slate-500 p-3 rounded-md ml-10 transition-all duration-300 dark:bg-white dark:text-black"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 'Turn on light theme' : 'Turn on dark theme'}
        </button>
        {data && (
          <Image
            width={40}
            height={40}
            src={data?.user.image}
            alt={data?.user.name}
            className="rounded-full"
          />
        )}
      </div>
      <main className="">
        <div className="flex justify-center items-center mb-5 ">
          <button
            className="bg-gray-300 p-2 rounded-md shadow-md"
            onClick={() => setToggleList(!toggleList)}
          >
            {toggleList ? <List /> : <Grid3X3 />}
          </button>
        </div>
        <div
          className={`w-full flex flex-col flex-wrap pb-5 justify-center items-center 
         ${toggleList ? 'lg:flex-row' : null} lg:justify-center lg:gap-x-4
        dark:bg-gray-900`}
        >
          {searchItems.slice(0, visibleItem).map((item, index) => {
            return (
              <div
                className="
                md
                w-full
                flex flex-col justify-between
                gap-5 py-4 px-4 bg-white mb-5
                items-center max-w-[600px]
                rounded-md
                shadow-md
                hover:bg-gray-50
                hover:shadow-xl
                transition-all duration-300 ease-in-out
                "
                key={index}
              >
                <h2 className="font-bold text-lg">{item.title}</h2>
                {item.lists.map((list, listIndex) => {
                  return (
                    <SearchList
                      list={list}
                      key={listIndex}
                      copiedIds={copiedIds}
                      id={`${index}-${listIndex}`}
                      handleCopy={handleCopy}
                    />
                  );
                })}
              </div>
            );
          })}
          {searchItems.length > visibleItem ? (
            <button
              type="button"
              className="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={loadMore}
            >
              Load More
            </button>
          ) : (
            <h2>All caught up!</h2>
          )}
        </div>
      </main>
    </div>
  );
}
