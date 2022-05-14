import React, { useState } from "react";
import "./SearchIngredient.css";

export default function SearchIngredient(props) {
  const [ingredients, setIngredients] = useState([]);

  function handleIngredients(e) {
    let ingredients = e.target.value;
    ingredients = ingredients.split(",");
    setIngredients(ingredients);
  }
  function handleSearch() {
    props.updateIngredients(ingredients);
    setIngredients([]);
  }
  return (
    <div className="search-ingredient-wrapper">
      <textarea onChange={handleIngredients} value={ingredients} name="ingredient-input" cols="20" rows="10"></textarea>
      <button onClick={handleSearch}>Search</button>
      <button>Upload Picture</button>
    </div>
  );
}
