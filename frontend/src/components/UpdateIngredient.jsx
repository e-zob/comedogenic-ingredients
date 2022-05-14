import React, { useState } from "react";
import { updateIngredient } from "../Networking";

export default function UpdateIngredient() {
  const [id, setId] = useState("");
  const [column, setColumn] = useState("");
  const [value, setValue] = useState("");

  function updateColumn(e) {
    setColumn(e.target.value);
  }

  function handleUpdate(e) {
    e.preventDefault();
    updateIngredient(id, column, value);
    setId("");
    setValue("");
  }

  return (
    <div>
      <input onChange={(e) => setId(e.target.value)} placeholder="id" value={id}></input>
      <select onChange={updateColumn}>
        <option value="comedogenicity">Comedogenicity</option>
        <option value="irritancy">Irritancy</option>
        <option value="ingredient">Name</option>
      </select>
      <input onChange={(e) => setValue(e.target.value)} placeholder="new value" value={value}></input>
      <button onClick={handleUpdate}>Update Ingredient</button>
    </div>
  );
}
