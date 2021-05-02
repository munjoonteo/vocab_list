import React from "react";

import Minus from "../static/minus.png";
import Tick from "../static/tick.png";

import "../style/Card.css";

function WordListCard({ word, onRemove }) {
  const [clicked, setClicked] = React.useState(false);
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
          onClick={e => {
            if (!clicked) {
              onRemove({
                expression: word.expression,
                reading: word.reading,
                meaning: word.meaning,
              });
              setClicked(true);
            }
          }}
        >
          {clicked ? (
            <img src={Tick} alt="" height="20px" width="20px" />
          ) : (
            <img src={Minus} alt="" height="20px" width="20px" />
          )}
          <div className="add-text">Remove from List</div>
        </div>
      </div>
    </div>
  );
}

export default WordListCard;
