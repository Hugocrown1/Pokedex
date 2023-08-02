'use client'

import { useState } from "react";

const Searcher = () => {
    

    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        
        handleEnterPress();
      }
    };
  
    const handleEnterPress = () => {
      // Aquí puedes realizar la lógica que deseas cuando se presiona Enterr
      console.log('Enter presionado. Valor del input:', inputValue);
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