'use client'

import { useState } from "react";

const Searcher = ({getPokeInfo}) => {
    

    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        
        getPokeInfo(inputValue)
      }
    };
  
  
    return (
      <input
        className="w-3/5 h-9 border px-4 py-2 text-xl rounded-md focus:ring-blue-500 focus:border-blue-500"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    );
}
  
  export default Searcher