import React from "react";

export default function Selector({ name, id, options, handleChange }) {
  return (
    <select name={name} key={id} id={id} onChange={handleChange} className="selector mb-20">
        {
            options.map((option, idx) => {
            return <option key={idx} value={option[0]}>{`${name}: ${option[1]}`}</option>
            })
        }
    </select>
  );
}
