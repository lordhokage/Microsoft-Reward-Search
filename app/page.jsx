'use client';
import { useState } from 'react';
import { searchItems } from '@/constant/data';

export default function Home() {
  const [text, setText] = useState('');
  const [copied, setIsCopied] = useState({});
  const handleCopy = async (item, index) => {
    try {
      await navigator.clipboard.writeText(item);
      setIsCopied((prevStates) => ({
        ...prevStates,
        [index]: true,
      }));

      setTimeout(() => {
        setIsCopied((prevStates) => ({
          ...prevStates,
          [index]: false,
        }));
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
              
      
              flex flex-row justify-between gap-10 px-6 py-2 bg-white mb-5 items-center max-w-[600px]
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
              <span>{item}</span>
              <button
                className="bg-purple-400 p-2 rounded-md hover:bg-slate-500 
                w-[120px]
                text-center
                text-white
                "
                onClick={() => handleCopy(item, index)}
              >
                {copied[index] ? 'Copied' : 'Copy Search'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
