'use client';
import { useMemo, useRef, useState } from 'react';
import { searchItems } from '@/constant/data';
import { Copy, Check } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [text, setText] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const handleCopy = async (searchWord, index, id) => {
    try {
      await navigator.clipboard.writeText(searchWord);
      setCopiedId(id);

      // setTimeout(() => {
      //   window.open('', '_blank');
      // }, 300);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.log(err.message);
    }
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
      <div className="w-full flex flex-col   justify-center items-center ">
        {searchItems.map((item, index) => {
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
              onClick={() => {}}
            >
              <h2 className="font-bold text-lg">{item.title}</h2>
              {item.lists.map((list, index) => {
                const idRef = useRef(crypto.randomUUID());
                return (
                  <div
                    className="flex justify-between w-full rounded-md hover:bg-[#d0e7f9] p-3 "
                    key={index}
                  >
                    <a
                      href="about:blank"
                      target="_blank"
                      className="flex-grow capitalize"
                    >
                      {list}
                    </a>
                    <button
                      className={`
                        rounded-md
                      text-black
                        text-center
                    `}
                      onClick={() => handleCopy(list, index, idRef.current)}
                    >
                      {copiedId === idRef.current ? <Check /> : <Copy />}
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
