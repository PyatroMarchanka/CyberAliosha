import React from "react";

export default function Button(props) {
  return (
    <button className={`${props.class} btn-outline-dark`} onClick={props.handleClick}>
      {props.text}
    </button>
  );
}
