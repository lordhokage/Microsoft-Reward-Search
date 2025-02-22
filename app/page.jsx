'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { searchItems } from '@/constant/data';

import SearchList from '@/components/SearchList';

export default function Home() {
  const [text, setText] = useState('');
  const [copiedIds, setCopiedIds] = useState([]);
  const [visibleItem, setVisibleItem] = useState(15);

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

      if (storedTheme) {
        setTheme(storedTheme);
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

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  return (
    <div
      className="min-h-screen z-50 bg-gray-100 flex gap-10
    flex-col sticky dark:bg-gray-900"
    >
      <header className="flex justify-center items-center dark:text-white  w-full py-5 ">
        <div className="w-full  items-center justify-center">
          <h1 className="text-[32px] font-bold text-center">
            Microsoft Rewards Search key words
          </h1>
          <button
            className="bg-slate-500 p-3 rounded-md ml-10 transition-all duration-300 dark:bg-white dark:text-black"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? 'Turn on light theme' : 'Turn on dark theme'}
          </button>
        </div>
      </header>
      <main>
        <div className="w-full flex flex-col pb-5 justify-center items-center  dark:bg-gray-900 ">
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
