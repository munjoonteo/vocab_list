import React from "react";
import WordListCard from "./WordListCard";
import "../style/Results.css";

function WordList({ wordList, onRemove }) {
  if (wordList.length === 0) {
    return (
      <div className="words">
        <div className="section-title">Current Word List</div>
        <div className="no-words">
          <div className="nothing">{`Add a word to see it in your word list!`}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="words">
        <div className="section-title">Current Word List</div>
        <div className="results">
          {wordList.map((word, index) => (
            <WordListCard word={word} onRemove={onRemove} key={index} />
          ))}
        </div>
      </div>
    );
  }
}

export default WordList;
