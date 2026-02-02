const DropDown = ({ options, onSelect, value, placeholder, setSearch }) => {
  return (
    <div className="relative w-full">
      {/* Search Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded p-2 text-sm"
      />

      {/* Options */}
      {options.length > 0 && (
        <ul className="absolute z-10 w-full border rounded mt-1 bg-white max-h-40 overflow-y-auto text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => onSelect(option.value)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
