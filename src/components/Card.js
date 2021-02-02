import React from "react";
import "../style/Card.css";

function Card({ word }) {
  return (
    <div className="card">
      <div className="reading">
        {!word.japanese[0].word ? null : word.japanese[0].reading}
      </div>
      <div className="word">
        {!word.japanese[0].word
          ? word.japanese[0].reading
          : word.japanese[0].word}
      </div>
      <div>
        {word.senses.map((sense, index) => (
          <div className="def" key={index}>
            <span className="index">{index + 1}. </span>
            <span>{sense.english_definitions.join("; ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
