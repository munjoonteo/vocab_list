import React from "react";

import "../style/Label.css";

function Label(props) {
  return <div className="label">{props.text}</div>;
}

export default Label;
