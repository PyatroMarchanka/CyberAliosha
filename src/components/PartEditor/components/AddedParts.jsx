import React from "react";
import AddedPartHeader from "./AddedPartHeader";

export default function AddedParts({ partOptionsArr }) {
  return (
      <div className="part-editor__added-parts mb-20 mt-20">
          {
              partOptionsArr.map((partOptions, index) => <AddedPartHeader key={index} partOptions={partOptions} />)
          }
      </div>
    
  );
}
