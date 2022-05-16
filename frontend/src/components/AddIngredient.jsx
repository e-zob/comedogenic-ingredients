import React, { useState } from "react";
import { addIngredient } from "../Networking";

export default function UpdateIngredient() {
  const [ingredient, setIngredient] = useState("");
  const [comedogenicity, setComedogenicity] = useState("");
  const [irritancy, setIrritancy] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    addIngredient(ingredient, comedogenicity, irritancy);
    setIngredient("");
    setComedogenicity("");
    setIrritancy("");
  }

  return (
    <div>
      <input onChange={(e) => setIngredient(e.target.value)} placeholder="Ingredient name*" value={ingredient}></input>
      <input onChange={(e) => setComedogenicity(e.target.value)} placeholder="Comedogenicity*" value={comedogenicity}></input>
      <input onChange={(e) => setIrritancy(e.target.value)} placeholder="Irritancy" value={irritancy}></input>
      <button onClick={handleAdd}>Add Ingredient</button>
    </div>
  );
}
