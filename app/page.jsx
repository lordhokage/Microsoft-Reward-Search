'use client';
import { useMemo, useRef, useState } from 'react';
import { searchItems } from '@/constant/data';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';
import SearchList from '@/components/SearchList';

export default function Home() {
  const [text, setText] = useState('');
  const [copiedIds, setCopiedIds] = useState([]);
  const [visibleItem, setVisibleItem] = useState(15);
  const handleCopy = async (searchWord, id) => {
    try {
      await navigator.clipboard.writeText(searchWord);
      setCopiedIds((prevState) => [...prevState, id]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadMore = () => {
    setVisibleItem(visibleItem + 15);
  };
  return (
    <div
      className="min-h-screen z-50 bg-gray-100 flex gap-10
    flex-col sticky "
    >
      <header className="flex justify-center items-center gap-20  w-full py-5 ">
        <div className=" flex items-center justify-center w-full">
          <h1 className="text-[32px] font-bold text-center">
            Microsoft Rewards Search key words
          </h1>
        </div>
      </header>
      <div className="w-full flex flex-col pb-5 justify-center items-center ">
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
            className="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={loadMore}
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
}
