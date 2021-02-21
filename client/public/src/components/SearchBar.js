import React from "react";
import "../style/SearchBar.css";

function SearchBar({ keyword, onChange }) {
  return (
    <input
      value={keyword}
      placeholder="Enter a word or phrase..."
      onChange={e => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
