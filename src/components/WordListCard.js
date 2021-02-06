import React from "react";
import "../style/Card.css";
import Minus from "../static/minus.png";

function WordListCard({ word, onRemove }) {
  return (
    <div className="card">
      <div className="card-left">
        <div className="reading">{word.reading}</div>
        <div className="word">{word.expression}</div>
        <div className="def">{word.meaning}</div>
      </div>
      <div className="card-right">
        <div
          className="add-button"
          onClick={e =>
            onRemove({
              expression: word.expression,
              reading: word.reading,
              meaning: word.meaning,
            })
          }
        >
          <img src={Minus} alt="" height="20px" width="20px" />
          <div className="add-text">Remove from List</div>
        </div>
      </div>
    </div>
  );
}

export default WordListCard;
