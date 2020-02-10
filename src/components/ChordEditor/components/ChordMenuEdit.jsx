import React from "react";
import Button from "./Button";

export default function ChordMenuEdit(props) {
  return (
    <div className="chord-menu">
        <Button class="btn" handleClick={props.deleteChord} text="Delete chord" />
        <Button class="btn"  handleClick={props.replaceChord} text="Replace chord" />
        <Button class="btn"  handleClick={props.deselectChord} text="Cancel" />
    </div>
  )
  
  
}
