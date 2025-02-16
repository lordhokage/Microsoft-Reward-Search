'use client';
import { useState } from 'react';
import { searchItems } from '@/constant/data';
import { Copy, Check } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const handleCopy = async (item, index) => {
    try {
      await navigator.clipboard.writeText(item);
      setCopiedId(index);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex gap-10
    flex-col items-center py-10 justify-center"
    >
      <h1 className="text-[32px] font-bold">
        Microsoft Rewards Search key words
      </h1>
      <ul>
        {searchItems.map((item, index) => {
          return (
            <li
              className="
              flex flex-row justify-between 
              gap-10 px-6 py-4 bg-white mb-5 
              items-center max-w-[600px]
              hover:cursor-pointer
              rounded-lg
              shadow-md
              hover:bg-gray-50
              hover:shadow-xl
              transition-all duration-300 ease-in-out
              "
              key={index}
              onClick={() => handleCopy(item, index)}
            >
              <a href="about:blank" target="_blank">
                {item}
              </a>
              <button
                className={`
                  p-2 rounded-md ${
                    copiedId == index ? 'bg-green-500' : 'bg-slate-500'
                  } 
                text-white
                  text-center
                  `}
                onClick={() => handleCopy(item, index)}
              >
                {copiedId === index ? <Check /> : <Copy />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
