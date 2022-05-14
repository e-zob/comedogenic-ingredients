import React, { useState } from "react";
import { deleteIngredient } from "../Networking";

export default function DeleteIngredient() {
  const [id, setId] = useState("");

  function handleDelete() {
    deleteIngredient(id);
    setId("");
  }

  return (
    <div>
      <input onChange={(e) => setId(e.target.value)} value={id} placeholder="id"></input>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
