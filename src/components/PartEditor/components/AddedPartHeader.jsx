import React from "react";

export default function AddedPartHeader({ partOptions }) {
  return (
    <div className="added-parts__part text-white">
      <p>{`Type: ${partOptions.type}`}</p>
      <p>{`Function: ${partOptions.function}`}</p>
      <p>{`Notes: ${partOptions.notes}`}</p>
      <p>{`Rest probability: ${partOptions.restProbability}%`}</p>
    </div>
  );
}
