import React, { useState } from "react";
import SearchIngredient from "./components/SearchIngredient";
import UpdateIngredient from "./components/UpdateIngredient";
import { getIngredients } from "./Networking";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = useState([]);

  async function updateIngredients(names) {
    let ingredientsData = [];
    for (const n of names) {
      const ingredient = await getIngredients(n);
      ingredientsData.push(ingredient);
    }
    ingredientsData = ingredientsData.flat();
    ingredientsData.length > 0 ? setIngredients(ingredientsData) : setIngredients(false);
  }

  function displayResults() {
    if (ingredients.length > 0) {
      return ingredients.map((ingredient, i) => {
        return (
          <div key={i}>
            {ingredient.ingredient}(id:{ingredient.id}): comedogenicity:{ingredient.comedogenicity}, irritancy:{ingredient.irritancy}
          </div>
        );
      });
    } else if (!ingredients) return <div>Ingredient not found</div>;
  }

  return (
    <div className="App">
      <h1>Check My Ingredient</h1>
      <SearchIngredient updateIngredients={updateIngredients} />
      {displayResults()}
    </div>
  );
}

export default App;
