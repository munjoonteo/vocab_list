import React from "react";

import Card from "./Card";

import "../style/Results.css";

function Words({ results, onAdd }) {
  if (results === null) {
    return (
      <div className="words">
        <div className="section-title">Results</div>
        <div className="no-words">
          <div className="nothing">{`Search for a word!`}</div>
        </div>
      </div>
    );
  } else if (results.data.data.length === 0) {
    return (
      <div className="words">
        <div className="section-title">Results</div>
        <div className="no-words">
          <div className="nothing">{`No results found :(`}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="words">
        <div className="section-title">Results</div>
        <div className="results">
          {results.data.data.map((word, index) => (
            <Card word={word} onAdd={onAdd} key={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default Words;
