import React, { useRef } from 'react';
import { Copy, Check } from 'lucide-react';

const SearchList = ({ list, index, copiedIds, id, handleCopy }) => {
  const idRef = useRef(crypto.randomUUID());
  const isCopied = copiedIds.includes(id);
  return (
    <div
      className={`flex justify-between w-full rounded-md ${
        isCopied ? 'bg-[#F3F4F6]' : null
      } hover:bg-[#d0e7f9] p-3`}
      key={index}
    >
      <a href="about:blank" target="_blank" className="flex-grow capitalize">
        {list}
      </a>
      <button
        className={`
        rounded-md
      text-black
        text-center
    `}
        onClick={() => handleCopy(list, id)}
      >
        {isCopied ? <Check className="text-green-400" /> : <Copy />}
      </button>
    </div>
  );
};

export default SearchList;
