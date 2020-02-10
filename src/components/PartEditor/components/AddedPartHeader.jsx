import React from "react";

export default function AddedPartHeader({ partOptions }) {
  return (
    <div className="added-parts__part text-white">{`Added part: Type: ${partOptions.type}, Function: ${partOptions.function}, Notes: ${partOptions.notes}`}</div>
  );
}
