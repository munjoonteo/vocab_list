import React from "react";

function Card({ word }) {
  console.log(word);
  return (
    <div>
      <div>{word.japanese[0].reading}</div>
      <div>{word.japanese[0].word}</div>
      <div>
        {word.senses[0].english_definitions.map(def => (
          <div>{def}</div>
        ))}
      </div>
    </div>
  );
}

export default Card;
