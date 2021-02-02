import React from "react";
import Card from "./Card";
import "../style/Results.css";

function Words({ results }) {
  if (results === null) {
    return (
      <div className="words">
        <div className="section-title">Results</div>
        <div className="nothing">{`Search for a word!`}</div>
      </div>
    );
  } else if (results.data.data.length === 0) {
    <div className="words">
      <div className="section-title">Results</div>
      <div className="nothing">{`No results found :(`}</div>
    </div>;
  } else {
    return (
      <div className="words">
        <div className="section-title">Results</div>
        <div className="results">
          {results.data.data.map((word, index) => (
            <Card word={word} key={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default Words;
