import React from "react";
import "../style/SearchBar.css";

function SearchBar({ keyword, setKeyword }) {
  return (
    <input
      value={keyword}
      placeholder="Enter a word or phrase..."
      onChange={e => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar;
