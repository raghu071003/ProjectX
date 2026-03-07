import React, { useState, useEffect, useRef } from "react";

const DropDown = ({ options, onSelect, value, placeholder, setSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open dropdown when options are available and user is typing
  useEffect(() => {
    if (options.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [options.length]);

  const handleItemClick = (optionValue) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full group" ref={containerRef}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => options.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-[#0d1117] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-700 shadow-inner group-hover:border-gray-700 font-medium"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <div className={`w-1.5 h-1.5 rounded-full ${options.length > 0 ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-gray-800'}`}></div>
        </div>
      </div>

      {/* Options Dropdown */}
      {isOpen && options.length > 0 && (
        <ul className="absolute z-[100] w-full bg-[#161b22] border border-gray-800 rounded-xl mt-2 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-52 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleItemClick(option.value)}
                className="px-4 py-3 hover:bg-indigo-600/10 hover:text-indigo-400 text-gray-300 text-sm cursor-pointer transition-all border-b border-gray-800 last:border-0 flex items-center justify-between group/item"
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-tighter opacity-0 group-hover/item:opacity-100 transition-opacity">Select</span>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default DropDown;


